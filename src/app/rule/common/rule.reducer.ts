import { AppAction } from '../../store/common/store.model';
import { ActionReducer } from '@ngrx/store';
import { IRule } from '../common/rule-model';
import { RuleActions } from '../common/rule.actions';

export type RuleListState = IRule[];

const initialState: RuleListState = [];

export function ruleReducer(state = initialState, action: AppAction<IRule>) {
  switch (action.type) {
    case RuleActions.LOAD_RULES_SUCCESS:
      return action.payload;

    case RuleActions.ADD_RULE:
      return [action.payload, ...state];

    case RuleActions.SAVE_RULE:
      return state.map((item) => {
        return item.id === action.payload.id
          ? Object.assign({}, item, { value: action.payload })
          : item;
      });

    case RuleActions.DELETE_RULE:
      return state.filter((rule) => rule.id !== action.payload.id);
    default:
      return state;
  }
}

export const RuleReducer: ActionReducer<any> = ruleReducer;
