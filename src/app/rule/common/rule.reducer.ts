import { AppAction, IAppStore } from '../../store/common/store.model';
import { ActionReducer, createSelector, State } from '@ngrx/store';
import { IRule } from './rule-model';
import * as fromActions from './rule.actions';
import { InitialState } from '@ngrx/store/src/models';

export type RuleListState = IRule[];

export const initialState: RuleListState = [];

/**
 * Rules Reducer
 * @param {RuleListState} state
 * @param {AppAction<IRule>} action
 * @returns {any}
 */
export function ruleReducer(
  state = initialState,
  action: fromActions.RuleActions
) {
  switch (action.type) {
    case fromActions.LOAD_RULES_SUCCESS: {
      return action.payload;
    }

    case fromActions.ADD_RULE:
      return [...state, action.payload];

    case fromActions.SAVE_RULE:
      return state.map(item => {
        return item.id === action.payload.id
          ? {...item, ...action.payload}
          : item;
      });

    case fromActions.DELETE_RULE:
      return state.filter(rule => rule.id !== action.payload.id);
    default:
      return state;
  }
}

export const RuleReducer: ActionReducer<RuleListState> = ruleReducer;

/**
 * Selected Rule Selector
 */
export const getRuleByIdSelector = id =>
  createSelector(
    (state: IAppStore) => state.rules,
    allRules => {
      if (id === 'add') {
        return {};
      }

      if (allRules && allRules.length > 0) {
        return allRules.find(item => {
          return item.id === id;
        });
      }
    }
  );
