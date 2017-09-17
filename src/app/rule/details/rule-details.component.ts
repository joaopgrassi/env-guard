import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rule-details',
  templateUrl: './rule-details.component.html',
  styleUrls: ['./rule-details.component.css']
})
export class RuleDetailsComponent implements OnInit {

  newRule: boolean;

  constructor(route: ActivatedRoute) {
    const id: string = route.snapshot.params.id;

    if (id === 'add') {
      this.newRule = true;
    }
  }

  ngOnInit() {
  }

}
