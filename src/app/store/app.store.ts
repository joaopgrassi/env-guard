import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers,  } from './common/store.model';
import { RuleEffects } from '../rule/';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([RuleEffects])
  ]
})
export class AppStore {
}
