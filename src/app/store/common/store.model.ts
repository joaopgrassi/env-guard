import { Action } from '@ngrx/store';
import { RuleReducer } from '../../rule/common/rule.reducer';
import { IRule } from '../../rule/common/rule-model';

export const reducers = {
  rule: RuleReducer
};

export interface IAppStore {
  rule: IRule[];
}

export interface AppAction<T> extends Action {
  payload: T;
}

