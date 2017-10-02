import { AppAction } from '../../store/common/store.model';
import { IRule } from './rule-model';
import { ActionReducer } from '@ngrx/store';

export const ADD_RULE = 'ADD_RULE';
export const UPDATE_RULE = 'UPDATE_RULE';
export const DELETE_RULE = 'DELETE_RULE';

export function ruleReducer(state = [], action: AppAction<IRule>) {
  switch (action.type) {
    case ADD_RULE:
      return [action.data, ...state];
    case DELETE_RULE:
      return state.filter((item) => item.id !== action.data.id);
    case UPDATE_RULE:
      return state.map((item) => {
        return item.id === action.data.id
          ? Object.assign({}, item, { value: action.data })
          : item;
      });
    default:
      return state;
  }
}
export const RuleReducer: ActionReducer<any> = ruleReducer;
