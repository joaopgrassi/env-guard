import { AppAction, IAppStore } from '../../store/common/store.model';
import { ActionReducer, createSelector } from '@ngrx/store';
import { IRule } from './rule-model';
import { RuleActions } from './rule.actions';

export type RuleListState = IRule[];

const initialState: RuleListState = [];

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
 * Selected Rule Selector
 */
export const getRuleByIdSelector = (id) => createSelector((state: IAppStore) => state.rules, (allRules) => {
  if (id === 'add') {
    return {};
  }

  if (allRules && allRules.length > 0) {
    return allRules.find(item => {
      return item.id === id;
    });
  }
});
