import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RuleActions } from './rule.actions';
import { RuleService } from './rule.service';
import { AppAction, IAppStore } from '../../store/common/store.model';
import { IRule } from './rule-model';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';

@Injectable()
export class RuleEffects {

  constructor (
    private actions$: Actions,
    private store$: Store<IAppStore>,
    private ruleService: RuleService
  ) {}

  @Effect() syncLocalStorage$ = this.actions$
    .ofType<AppAction<IRule[]>>(RuleActions.SYNC_LOCAL_STORAGE)
    .withLatestFrom(this.store$.select(s => s.rule))
    .map(([ action, state ]) => {
      this.ruleService.syncToLocalStorage(state);
    });
}
