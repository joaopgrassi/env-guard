import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Icon, IRule, OperatorRules } from '../common/rule-model';
import { RuleService } from '../common/rule.service';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../store/common/store.model';
import { v4 as uuid } from 'uuid';
import { RuleActions } from '../common/rule.actions';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

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
