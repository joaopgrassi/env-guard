import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Icon, IRule, OperatorRules } from '../common/rule-model';
import { RuleService } from '../common/rule.service';

@Component({
  selector: 'app-rule-details',
  templateUrl: './rule-details.component.html',
  styleUrls: ['./rule-details.component.css']
})
export class RuleDetailsComponent implements OnInit {

  newRule: boolean;
  ruleForm: FormGroup;
  operatorKeys: any;
  operatorRules = OperatorRules;
  icons: Icon[];

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private ruleService: RuleService) {

    const id: string = route.snapshot.params.id;

    if (id === 'add') {
      this.newRule = true;
    }
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
  }

  private setUpForm() {
    this.ruleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.required]],
      operator: ['', [Validators.required]],
      title: [''],
      icon: ['', [Validators.required]],
      iconUrl: ['']
    });
  }
}
