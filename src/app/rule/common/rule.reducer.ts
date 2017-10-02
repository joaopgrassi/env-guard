import { AppAction } from '../../store/common/store.model';
import { ActionReducer } from '@ngrx/store';
import { IRule } from '../common/rule-model';
import { RuleActions } from '../common/rule.actions';

export type RuleListState = IRule[];

const initialState: RuleListState = [];

export function ruleReducer(state = initialState, action: AppAction<IRule>) {
  switch (action.type) {
    case RuleActions.LOAD_RULES_SUCCESS:
      return action.data;

    case RuleActions.ADD_RULE:
      return [action.data, ...state];

    case RuleActions.SAVE_RULE:
      return state.map((item) => {
        return item.id === action.data.id
          ? Object.assign({}, item, { value: action.data })
          : item;
      });

    case RuleActions.DELETE_RULE:
      return state.filter((rule) => rule.id !== action.data.id);
    default:
      return state;
  }
}

export const RuleReducer: ActionReducer<any> = ruleReducer;
