import { Routes } from '@angular/router';
import { RuleDashboardComponent } from './rule/dashboard/rule-dashboard.component';
import { RuleDetailsComponent } from './rule/details/rule-details.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'rules/dashboard', pathMatch: 'full' },
  { path: 'rules/dashboard', component: RuleDashboardComponent },
  { path: 'rules/:id', component: RuleDetailsComponent },
];
