import { Action } from '@ngrx/store';
import { IRule } from './rule-model';

export const SYNC_LOCAL_STORAGE = '[Rule] Sync Local Storage';
export const SYNC_LOCAL_STORAGE_SUCCESS = '[Rule] Sync Local Storage Success';
export const LOAD_RULES = '[Rule] Load Rules';
export const LOAD_RULES_SUCCESS = '[Rules] Load Rules Success';

export const SAVE_RULE = '[Rule] Save Rule';
export const ADD_RULE = '[Rule] Add Rule';
export const DELETE_RULE = '[Rule] Delete Rule';

export class SyncLocalStorage implements Action {
  readonly type = SYNC_LOCAL_STORAGE;
}

export class SyncLocalStorageSuccess implements Action {
  readonly type = SYNC_LOCAL_STORAGE_SUCCESS;
}

export class LoadRules implements Action {
  readonly type = LOAD_RULES;
}

export class LoadRuleSuccess implements Action {
  readonly type = LOAD_RULES_SUCCESS;

  constructor(public payload: IRule[]) {}
}

export class SaveRule implements Action {
  readonly type = SAVE_RULE;

  constructor(public payload: IRule) {}
}

export class AddRule implements Action {
  readonly type = ADD_RULE;

  constructor(public payload: IRule) {}
}

export class DeleteRule implements Action {
  readonly type = DELETE_RULE;

  constructor(public payload: IRule) {}
}

export type RuleActions =
  | AddRule
  | SaveRule
  | DeleteRule
  | LoadRules
  | LoadRuleSuccess
  | SyncLocalStorage
  | SyncLocalStorageSuccess;
