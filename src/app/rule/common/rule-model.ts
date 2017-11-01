import { v4 as uuid } from 'uuid';

export const OperatorRules = {
  Contains: 'Contains',
  StartsWith: 'Starts with',
  EndsWith: 'Ends with',
  Exact: 'Exact',
  Regex: 'Regex'
};

export interface IIcon {
  name: string;
  key: string;
  path: string;
}

export class Icon implements IIcon {
  name: string;
  key: string;
  path: string;

  /***
   * Creates a new Icon
   * @param {string} name
   * @param {string} key
   * @param {string} path
   */
  constructor(name: string, key: string, path: string) {
    this.name = name;
    this.key = key;
    this.path = path;
  }
}

export interface IRule {
  id: string;
  name: string;
  url: string;
  operator: string;
  title: string;
  icon: Icon;
}

export class Rule implements IRule {
  id: string;
  name: string;
  url: string;
  operator: string;
  title: string;
  icon: Icon;

  /**
   * Creates a new instance of Rule
   * @param {string} id
   * @param {string} name
   * @param {string} url
   * @param {string} operator
   * @param {string} title
   * @param {Icon} icon
   */
  constructor(id: string, name: string, url: string, operator: string, title: string, icon: Icon) {
    this.id = id || uuid();
    this.name = name;
    this.url = url;
    this.operator = operator;
    this.title = title;
    this.icon = icon;
  }
}

export class StorageRules {
  envGuard: IRule[];
  constructor (rules: IRule[]) {
    this.envGuard = rules;
  }
}
