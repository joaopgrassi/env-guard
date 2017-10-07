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
  static GET_RULE_SUCCESS = '[Rule] Get Rule Success';

  static RESET_RULE = '[Rule] Reset Rule';

  static SAVE_RULE = '[Rule] Save Rule';
  static SAVE_RULE_SUCCESS = '[Rule] Save Rule Success';

  static ADD_RULE = '[Rule] Add Rule';
  static ADD_RULE_SUCCESS = '[Rule] Add Rule Success';

  static DELETE_RULE = '[Rule] Delete Rule';
  static DELETE_RULE_SUCCESS = '[Rule] Delete Rule Success';

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

  getRule(id): AppAction<IRule> {
    return {
      type: RuleActions.GET_RULE,
      payload: id
    };
  }

  getRuleSuccess(rule): AppAction<IRule> {
    return {
      type: RuleActions.GET_RULE_SUCCESS,
      payload: rule
    };
  }

  resetRule(): Action {
    return {
      type: RuleActions.RESET_RULE
    };
  }

  saveRule(rule): AppAction<IRule> {
    return {
      type: RuleActions.SAVE_RULE,
      payload: rule
    };
  }

  saveRuleSuccess(rule): AppAction<IRule> {
    return {
      type: RuleActions.SAVE_RULE_SUCCESS,
      payload: rule
    };
  }

  addRule(rule): AppAction<IRule> {
    return {
      type: RuleActions.ADD_RULE,
      payload: rule
    };
  }

  addRuleSuccess(rule): AppAction<IRule> {
    return {
      type: RuleActions.ADD_RULE_SUCCESS,
      payload: rule
    };
  }

  deleteHero(rule): AppAction<IRule> {
    return {
      type: RuleActions.DELETE_RULE,
      payload: rule
    };
  }

  deleteHeroSuccess(rule): AppAction<IRule> {
    return {
      type: RuleActions.DELETE_RULE_SUCCESS,
      payload: rule
    };
  }
}
