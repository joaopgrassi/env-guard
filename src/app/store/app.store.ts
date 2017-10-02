import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './common/store.model';
import { EffectsModule } from '@ngrx/effects';
import { RuleEffects } from '../rule/common/rule.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, []),
    EffectsModule.forRoot([RuleEffects])
  ]
})
export class AppStore {
}
