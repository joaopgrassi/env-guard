import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';

import { NotificationService } from '../../common';
import { IAppStore } from '../../store';

import {
  getRuleByIdSelector, IIcon, IRule, IRuleBanner, OperatorRules, Rule, RuleActions, RuleBanner,
  RuleService
} from '../common/';

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
  useBanner: boolean;
  formReady: boolean;

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
      }
      this.store.select(getRuleByIdSelector(id)).subscribe((rule: IRule) => {
        if (rule) {
          this.formReady = true;
          this.currentRule = rule;
          this.setUpForm(rule);
        }
      });
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
   * Verifies if needs to initialize the Banner Form.
   */
  toggleAddBannerCheckbox() {
    if (this.useBanner) {
      if (!this.currentRule.banner) {
        this.initializeBanner();
      }
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

    if (this.useBanner) {
      rule.addRuleBanner(this.ruleForm.get('banner').value);
    }

    if (this.newRule) {
      this.store.dispatch(this.ruleActions.addRule(rule));
    } else {
      this.store.dispatch(this.ruleActions.saveRule(rule));
    }

    // TODO: This should be refactored and listen to ActionSubject
    this.store.dispatch(this.ruleActions.syncLocalStorage());

    this.goToDashboard();
    this.notificationService.notifySuccess('Rule Saved!');
  }

  cancel() {
    this.goToDashboard();
  }

  /**
   * Initializes a new Banner Form with default values extracted from Rule.
   */
  private initializeBanner() {
    const icon = this.getIcon(this.ruleForm.value.icon);
    this.addBannerFormGroup(new RuleBanner(this.ruleForm.value.name, icon.iconBaseColor, '#FFF'));
  }

  /**
   * Adds or Updates the formGroup for the Rule Banner
   * @param {IRuleBanner} banner
   */
  private addBannerFormGroup(banner?: IRuleBanner) {
    // if was already added before just update the values with patchValue
    if (this.ruleForm.contains('banner')) {
      this.ruleForm.get('banner').patchValue(banner);
      return;
    }

    const bannerFormGroup = this.formBuilder.group({
      text: [banner.text],
      bgColor: [banner.bgColor],
      textColor: [banner.textColor]
    });
    this.ruleForm.addControl('banner', bannerFormGroup);
  }

  private setUpForm(currentRule: IRule) {
    this.ruleForm = this.formBuilder.group({
      id: [currentRule.id],
      name: [currentRule.name, [Validators.required]],
      url: [currentRule.url, [Validators.required]],
      operator: [currentRule.operator, [Validators.required]],
      title: [currentRule.title],
      icon: [(currentRule.icon) ? currentRule.icon.key : '', [Validators.required]]
    });

    if (this.currentRule.banner) {
      this.useBanner = true;
      this.addBannerFormGroup(this.currentRule.banner);
    }
  }

  /**
   * Redirects to the rules dashboard
   */
  private goToDashboard() {
    this.router.navigate(['rules/dashboard']);
  }
}
