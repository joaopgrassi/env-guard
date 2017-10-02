import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { IRule } from '../common/rule-model';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../store/common/store.model';

@Component({
  selector: 'app-rule-dashboard',
  templateUrl: './rule-dashboard.component.html',
  styleUrls: ['./rule-dashboard.component.css']
})
export class RuleDashboardComponent implements OnInit {

  displayedColumns = ['name', 'operator', 'url'];
  dataSource: RulesDataSource;

  constructor(private router: Router,
              private store: Store<any>) {
  }

  ngOnInit() {
    this.dataSource = new RulesDataSource(this.store);
  }

  newRule() {
    this.router.navigate(['rules/add']);
  }
}

export class RulesDataSource extends DataSource<IRule> {
  constructor(private store: Store<IAppStore>) {
    super();
  }

  connect(): Observable<IRule[]> {
    return this.store.select(r => r.rule);
  }

  disconnect() {
  }
}
