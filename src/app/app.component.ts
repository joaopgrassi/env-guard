import { Component, HostListener } from '@angular/core';
import { RuleActions } from './rule/common/rule.actions';
import { Store } from '@ngrx/store';
import { IAppStore } from './store/common/store.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private ruleActions: RuleActions,
              private store: Store<IAppStore>) {
    this.store.dispatch(this.ruleActions.loadRules());
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    this.store.dispatch(this.ruleActions.syncLocalStorage());
  }
}
