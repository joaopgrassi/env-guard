import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { RuleActions } from './rule/common/rule.actions';
import { IAppStore } from './store';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private ruleActions: RuleActions,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private store: Store<IAppStore>) {
    this.store.dispatch(this.ruleActions.loadRules());
    this.registerIcons();
  }

  /**
   * Regiters custom items globaly to be used with mat-icon.
   */
  private registerIcons() {
    this.iconRegistry.addSvgIcon('github', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/mark-github.svg'));
    this.iconRegistry.addSvgIcon('chrome', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/chrome.svg'));
  }
}
