import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { IRule } from '../common/rule-model';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../store/common/store.model';
import { RuleActions } from '../common/rule.actions';

@Component({
  selector: 'app-rule-dashboard',
  templateUrl: './rule-dashboard.component.html',
  styleUrls: ['./rule-dashboard.component.css']
})
export class RuleDashboardComponent implements OnInit {

  displayedColumns = ['name', 'operator', 'url', 'actions'];
  dataSource: RulesDataSource;

  constructor(private router: Router,
              private ruleActions: RuleActions,
              private store: Store<any>) {
  }

  ngOnInit() {
    this.dataSource = new RulesDataSource(this.store);
  }

  /**
   * Add a new rule
   */
  newRule() {
    this.store.dispatch(this.ruleActions.getRule(<IRule>{}));
    this.router.navigate(['rules/add']);
  }

  /**
   * Modify an existing rule
   * @param {IRule} rule
   */
  edit(rule: IRule) {
    this.store.dispatch(this.ruleActions.getRule(rule));
    this.router.navigate([`rules/${rule.id}`]);
  }

  /**
   * Removes a rule
   * @param {IRule} rule
   */
  delete(rule: IRule) {
    this.store.dispatch(this.ruleActions.deleteRule(rule));
  }
}

export class RulesDataSource extends DataSource<IRule> {
  constructor(private store: Store<IAppStore>) {
    super();
  }

  connect(): Observable<IRule[]> {
    return this.store.select(r => r.rules);
  }

  disconnect() {
  }
}
