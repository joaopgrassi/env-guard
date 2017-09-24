import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperatorRules } from '../common/rule-model';

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

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder) {

    const id: string = route.snapshot.params.id;

    if (id === 'add') {
      this.newRule = true;
    }
  }

  ngOnInit() {
    this.operatorKeys =  Object.keys(OperatorRules).map(x => x);
    this.setUpForm();
  }

  save() {
    const test = this.ruleForm;
  }

  private setUpForm() {
    this.ruleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.required]],
      operator: ['', [Validators.required]]
    });
  }

}
