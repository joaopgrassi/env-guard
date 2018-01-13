import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

import { IAppStore } from '../../store/common/store.model';
import { NotificationService } from '../../common/notification.service';

import { IRule, RuleActions } from '../common/';

@Component({
  selector: 'app-rule-dashboard',
  templateUrl: './rule-dashboard.component.html',
  styleUrls: ['./rule-dashboard.component.css']
})
export class RuleDashboardComponent implements OnInit {

  displayedColumns = ['name', 'operator', 'url', 'icon', 'actions'];
  dataSource: RulesDataSource;

  constructor(private router: Router,
              private ruleActions: RuleActions,
              private notificationService: NotificationService,
              private store: Store<IAppStore>) {
  }

  ngOnInit() {
    this.dataSource = new RulesDataSource(this.store);
  }

  /**
   * Add a new rule
   */
  newRule() {
    this.router.navigate(['rules/add']);
  }

  /**
   * Modify an existing rule
   * @param {IRule} rule
   */
  edit(rule: IRule) {
    this.router.navigate([`rules/${rule.id}`]);
  }

  /**
   * Duplicate an existing rule
   * @param {IRule} rule
   */
  duplicate(rule: IRule) {
    const copy = Object.assign({}, rule);
    copy.id = uuid();
    copy.name = `${rule.name} - Copy`;
    this.store.dispatch(this.ruleActions.addRule(copy));

    // TODO: This should be refactored and listen to ActionSubject
    this.store.dispatch(this.ruleActions.syncLocalStorage());

    this.notificationService.notifySuccess('Rule duplicated!');
  }

  /**
   * Removes a rule
   * @param {IRule} rule
   */
  remove(rule: IRule) {
    this.store.dispatch(this.ruleActions.deleteRule(rule));

    // TODO: This should be refactored and listen to ActionSubject
    this.store.dispatch(this.ruleActions.syncLocalStorage());
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
