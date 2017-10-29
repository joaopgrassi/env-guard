import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';

import { NotificationService } from '../../common/notification.service';
import { IAppStore } from '../../store/common/store.model';

import { Icon, IRule, Rule, OperatorRules, RuleService, RuleActions } from '../common/';

@Component({
  selector: 'app-rule-details',
  templateUrl: './rule-details.component.html',
  styleUrls: ['./rule-details.component.css']
})
export class RuleDetailsComponent implements OnInit {
  currentRule: IRule = <IRule>{};
  newRule: boolean;
  ruleForm: FormGroup;
  operatorKeys: any;
  operatorRules = OperatorRules;
  icons: Icon[];

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private ruleService: RuleService,
              private ruleActions: RuleActions,
              private notificationService: NotificationService,
              private store: Store<IAppStore>) {

    const id: string = activateRoute.snapshot.params.id;

    if (id === 'add') {
      this.newRule = true;
    } else {
      this.store.dispatch(this.ruleActions.getRule(id));
    }
    store.select(x => x.selectedRule).subscribe((rule: IRule) => {
      this.currentRule = rule;
    });
  }

  ngOnInit() {
    this.operatorKeys = Object.keys(OperatorRules).map(x => x);
    this.ruleService.getDefaultIcons().subscribe((resp: Icon[]) => {
      this.icons = resp;
    });

    this.setUpForm();
  }

  /**
   * Get the icon based on the key
   * @param {string} key
   * @returns {Icon}
   */
  getIcon(key: string): Icon {
    if (key && this.icons) {
      return this.icons.find(i => i.key === key);
    }
  }

  /**
   * Saves or updates a rule
   */
  save() {
    const rule = new Rule(
      this.ruleForm.value.id,
      this.ruleForm.value.name,
      this.ruleForm.value.url,
      this.ruleForm.value.operator,
      this.ruleForm.value.title,
      this.getIcon(this.ruleForm.value.icon));

    if (this.newRule) {
      this.store.dispatch(this.ruleActions.addRule(rule));
    } else {
      this.store.dispatch(this.ruleActions.saveRule(rule));
    }
    this.goToDashboard();
    this.notificationService.notifySuccess('Rule Saved!');
  }

  cancel() {
    this.goToDashboard();
  }

  private setUpForm() {
    this.ruleForm = this.formBuilder.group({
      id: [this.currentRule.id],
      name: [this.currentRule.name, [Validators.required]],
      url: [this.currentRule.url, [Validators.required]],
      operator: [this.currentRule.operator, [Validators.required]],
      title: [this.currentRule.title],
      icon: [this.currentRule.icon ? this.currentRule.icon.key : '', [Validators.required]]
    });
  }

  /**
   * Redirects to the rules dashboard
   */
  private goToDashboard() {
    this.router.navigate(['rules/dashboard']);
  }
}
