export const OperatorRules = {
  Contains: 'Contains',
  StartsWith: 'Starts with',
  EndsWith: 'Ends with',
  Exact: 'Exact',
  Regex: 'Regex'
};

export interface Icon {
  name: string;
  key: string;
  path: string;
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
    this.id = id;
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
