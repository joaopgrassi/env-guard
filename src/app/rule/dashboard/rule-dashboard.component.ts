import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rule-dashboard',
  templateUrl: './rule-dashboard.component.html',
  styleUrls: ['./rule-dashboard.component.css']
})
export class RuleDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newRule() {
    this.router.navigate(['rules/add']);
  }

}
