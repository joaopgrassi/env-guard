import { AppAction } from '../../store/common/store.model';
import { ActionReducer } from '@ngrx/store';
import { IRule } from '../common/rule-model';
import { RuleActions } from '../common/rule.actions';

export type RuleListState = IRule[];

const initialState: RuleListState = [];
const initialSelectedState = <IRule>{};


/**
 * Rules Reducer
 * @param {RuleListState} state
 * @param {AppAction<IRule>} action
 * @returns {any}
 */
export function ruleReducer(state = initialState, action: AppAction<IRule>) {
  switch (action.type) {
    case RuleActions.LOAD_RULES_SUCCESS:
      return action.payload;

    case RuleActions.ADD_RULE:
      return [...state, action.payload];

    case RuleActions.SAVE_RULE:
      return state.map(item => {
        return item.id === action.payload.id
          ? Object.assign({}, item, action.payload)
          : item;
      });

    case RuleActions.DELETE_RULE:
      return state.filter((rule) => rule.id !== action.payload.id);
    default:
      return state;
  }
}
export const RuleReducer: ActionReducer<any> = ruleReducer;

/**
 * Selected Rule Reducer
 * @param {{}} state
 * @param {AppAction<IRule>} action
 * @returns {any}
 */
export function selectedRuleReducer(state = initialSelectedState, action: AppAction<IRule>) {
  switch (action.type) {

    case RuleActions.GET_RULE:
      return action.payload;

    default:
      return state;
  }
}
export const SelectedRuleReducer: ActionReducer<any> = selectedRuleReducer;
