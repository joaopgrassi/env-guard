import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './common/store.model';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, [])
  ]
})
export class AppStore {
}
