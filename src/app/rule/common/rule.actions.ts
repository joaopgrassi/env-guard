import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { AppAction } from '../../store/common/store.model';
import { IRule } from './rule-model';

@Injectable()
export class RuleActions {

  static SYNC_LOCAL_STORAGE = '[Rule] Sync Local Storage';
  static LOAD_RULES = '[Rule] Load Rules';
  static LOAD_RULES_SUCCESS = '[Rules] Load Rules Success';

  static GET_RULE = '[Rule] Get Rule';
  static SAVE_RULE = '[Rule] Save Rule';
  static ADD_RULE = '[Rule] Add Rule';
  static DELETE_RULE = '[Rule] Delete Rule';

  syncLocalStorage(): Action {
    return {
      type: RuleActions.SYNC_LOCAL_STORAGE
    };
  }

  loadRules(): Action {
    return {
      type: RuleActions.LOAD_RULES
    };
  }

  loadRuleSuccess(rules: IRule[]): AppAction<IRule[]> {
    return {
      type: RuleActions.LOAD_RULES_SUCCESS,
      payload: rules
    };
  }

  getRule(rule: IRule): AppAction<IRule> {
    return {
      type: RuleActions.GET_RULE,
      payload: rule
    };
  }

  saveRule(rule): AppAction<IRule> {
    return {
      type: RuleActions.SAVE_RULE,
      payload: rule
    };
  }

  addRule(rule): AppAction<IRule> {
    return {
      type: RuleActions.ADD_RULE,
      payload: rule
    };
  }

  deleteRule(rule): AppAction<IRule> {
    return {
      type: RuleActions.DELETE_RULE,
      payload: rule
    };
  }
}
