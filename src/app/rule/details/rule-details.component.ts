import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';

import { NotificationService } from '../../common/notification.service';
import { IAppStore } from '../../store/common/store.model';

import { IIcon, IRule, OperatorRules, Rule, RuleActions, RuleService } from '../common/';

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
  icons: IIcon[];

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private ruleService: RuleService,
              private ruleActions: RuleActions,
              private notificationService: NotificationService,
              private store: Store<IAppStore>) {
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(p => {
      const id = p.get('id');
      if (id === 'add') {
        this.newRule = true;
      } else {
        this.store.dispatch(this.ruleActions.getRule(id));
      }
    });

    this.store.select(x => x.selectedRule).subscribe((rule: IRule) => {
      this.currentRule = rule;
      this.setUpForm(this.currentRule);
    });

    this.operatorKeys = Object.keys(OperatorRules).map(x => x);
    this.ruleService.getDefaultIcons().subscribe((resp: IIcon[]) => {
      this.icons = resp;
    });
  }

  /**
   * Get the icon based on the key
   * @param {string} key
   * @returns {IIcon}
   */
  getIcon(key: string): IIcon {
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

  private setUpForm(currentRule: IRule) {
    this.ruleForm = this.formBuilder.group({
      id: [currentRule.id],
      name: [currentRule.name, [Validators.required]],
      url: [currentRule.url, [Validators.required]],
      operator: [currentRule.operator, [Validators.required]],
      title: [currentRule.title],
      icon: [currentRule.icon ? currentRule.icon.key : '', [Validators.required]]
    });
  }

  /**
   * Redirects to the rules dashboard
   */
  private goToDashboard() {
    this.router.navigate(['rules/dashboard']);
  }
}
