import { Action } from '@ngrx/store';
import { RuleReducer, SelectedRuleReducer } from '../../rule/common/rule.reducer';
import { IRule } from '../../rule/common/rule-model';

export const reducers = {
  rules: RuleReducer,
  selectedRule: SelectedRuleReducer
};

export interface IAppStore {
  rules: IRule[];
  selectedRule: IRule;
}

export interface AppAction<T> extends Action {
  payload: T;
}

