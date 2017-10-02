import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { AppAction } from '../../store/common/store.model';
import { IRule } from './rule-model';

@Injectable()
export class RuleActions {

  static LOAD_RULES = 'LOAD_RULES';
  static LOAD_RULES_SUCCESS = 'LOAD_RULES_SUCCESS';

  static GET_RULE = 'GET_RULE';
  static GET_RULE_SUCCESS = 'GET_RULE_SUCCESS';

  static RESET_RULE = 'RESET_RULE';

  static SAVE_RULE = 'SAVE_RULE';
  static SAVE_RULE_SUCCESS = 'SAVE_RULE_SUCCESS';

  static ADD_RULE = 'ADD_RULE';
  static ADD_RULE_SUCCESS = 'ADD_RULE_SUCCESS';

  static DELETE_RULE = 'DELETE_RULE';
  static DELETE_RULE_SUCCESS = 'DELETE_RULE_SUCCESS';

  loadRules(): Action {
    return {
      type: RuleActions.LOAD_RULES
    };
  }

  loadRuleSuccess(rules): AppAction<IRule[]> {
    return {
      type: RuleActions.LOAD_RULES_SUCCESS,
      data: rules
    };
  }

  getRule(id): AppAction<IRule> {
    return {
      type: RuleActions.GET_RULE,
      data: id
    };
  }

  getRuleSuccess(rule): AppAction<IRule> {
    return {
      type: RuleActions.GET_RULE_SUCCESS,
      data: rule
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
      data: rule
    };
  }

  saveRuleSuccess(rule): AppAction<IRule> {
    return {
      type: RuleActions.SAVE_RULE_SUCCESS,
      data: rule
    };
  }

  addRule(rule): AppAction<IRule> {
    return {
      type: RuleActions.ADD_RULE,
      data: rule
    };
  }

  addRuleSuccess(rule): AppAction<IRule> {
    return {
      type: RuleActions.ADD_RULE_SUCCESS,
      data: rule
    };
  }

  deleteHero(rule): AppAction<IRule> {
    return {
      type: RuleActions.DELETE_RULE,
      data: rule
    };
  }

  deleteHeroSuccess(rule): AppAction<IRule> {
    return {
      type: RuleActions.DELETE_RULE_SUCCESS,
      data: rule
    };
  }
}
