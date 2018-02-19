import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/map";

import * as RuleActions from "./rule.actions";
import { RuleService } from "./rule.service";
import { AppAction, IAppStore } from "../../store/common/store.model";
import { IRule } from "./rule-model";

@Injectable()
export class RuleEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<IAppStore>,
    private ruleService: RuleService
  ) {}

  /**
   * Saves the rules to the browser storage
   * @type {Observable<any>}
   */
  @Effect()
  syncRules$ = this.actions$
    .ofType<AppAction<IRule[]>>(RuleActions.SYNC_LOCAL_STORAGE)
    .withLatestFrom(this.store$.select(s => s.rules))
    .switchMap(([action, state]) =>
      this.ruleService
        .saveRules(state)
        .map((_: boolean) => new RuleActions.SyncLocalStorageSuccess())
    );

  /**
   * Load all rules from the browser storage
   * @type {Observable<any>}
   */
  @Effect()
  loadRules$ = this.actions$
    .ofType(RuleActions.LOAD_RULES)
    .switchMap(() =>
      this.ruleService
        .getAllRules()
        .map((rules: IRule[]) => new RuleActions.LoadRuleSuccess(rules))
    );
}
