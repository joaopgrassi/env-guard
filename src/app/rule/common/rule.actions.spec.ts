import {
  AddRule,
  ADD_RULE,
  SaveRule,
  SAVE_RULE,
  DeleteRule,
  DELETE_RULE,
  LoadRules,
  LOAD_RULES,
  LoadRuleSuccess,
  LOAD_RULES_SUCCESS,
  SyncLocalStorage,
  SYNC_LOCAL_STORAGE,
  SyncLocalStorageSuccess,
  SYNC_LOCAL_STORAGE_SUCCESS
} from "./rule.actions";
import { IRule } from "./index";

let rule: IRule;

beforeEach(() => {
  rule = {
    id: "1",
    name: "name",
    url: "url",
    operator: "operator",
    banner: null,
    icon: null,
    title: "title"
  };
});

describe("AddRule", () => {
  it("should create an action", () => {
    const action = new AddRule(rule);

    expect({ ...action }).toEqual({ type: ADD_RULE, payload: rule });
  });
});

describe("SaveRule", () => {
  it("should create an action", () => {
    const action = new SaveRule(rule);

    expect({ ...action }).toEqual({ type: SAVE_RULE, payload: rule });
  });
});

describe("DeleteRule", () => {
  it("should create an action", () => {
    const action = new DeleteRule(rule);

    expect({ ...action }).toEqual({ type: DELETE_RULE, payload: rule });
  });
});

describe("LoadRules", () => {
  it("should create an action", () => {
    const action = new LoadRules();

    expect({ ...action }).toEqual({ type: LOAD_RULES });
  });
});

describe("LoadRulesSuccess", () => {
  it("should create an action", () => {
    const action = new LoadRuleSuccess([rule]);

    expect({ ...action }).toEqual({
      type: LOAD_RULES_SUCCESS,
      payload: [rule]
    });
  });
});

describe("SyncLocalStorage", () => {
  it("should create an action", () => {
    const action = new SyncLocalStorage();

    expect({ ...action }).toEqual({
      type: SYNC_LOCAL_STORAGE
    });
  });
});

describe("SyncLocalStorageSuccess", () => {
  it("should create an action", () => {
    const action = new SyncLocalStorageSuccess();

    expect({ ...action }).toEqual({
      type: SYNC_LOCAL_STORAGE_SUCCESS
    });
  });
});
