import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import 'rxjs/add/operator/map';

import { NotificationService } from '../../common/notification.service';
import { IAppStore } from '../../store/common/store.model';

import { Icon, IRule, OperatorRules, RuleService, RuleActions } from '../common/';

@Component({
  selector: 'app-rule-details',
  templateUrl: './rule-details.component.html',
  styleUrls: ['./rule-details.component.css']
})
export class RuleDetailsComponent implements OnInit {

  currentRule: IRule;
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

  save() {
    const data = this.ruleForm.value as IRule;
    if (this.newRule) {
      this.store.dispatch(this.ruleActions.addRule(data));
    } else {
      this.store.dispatch(this.ruleActions.saveRule(data));
    }
    this.goToDashboard();
    this.notificationService.notifySuccess('Rule Saved!');
  }

  cancel() {
    this.goToDashboard();
  }

  private setUpForm() {
    this.ruleForm = this.formBuilder.group({
      id: [this.currentRule.id || uuid()],
      name: [this.currentRule.name, [Validators.required]],
      url: [this.currentRule.url, [Validators.required]],
      operator: [this.currentRule.operator, [Validators.required]],
      title: [this.currentRule.title],
      icon: [this.currentRule.icon, [Validators.required]]
    });
  }

  /**
   * Redirects to the rules dashboard
   */
  private goToDashboard() {
    this.router.navigate(['rules/dashboard']);
  }
}
