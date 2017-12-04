import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { RuleActions } from './rule/common/rule.actions';
import { IAppStore } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private ruleActions: RuleActions,
              private store: Store<IAppStore>) {
    this.store.dispatch(this.ruleActions.loadRules());
  }
}
