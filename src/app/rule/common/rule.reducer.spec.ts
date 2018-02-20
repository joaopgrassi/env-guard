import * as fromReducer from './rule.reducer';
import * as fromActions from './rule.actions';

describe('RuleReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = { type: null };
      const state = fromReducer.ruleReducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_RULES action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = new fromActions.LoadRules();
      const state = fromReducer.ruleReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });
});
