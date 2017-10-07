export const OperatorRules = {
  Contains: 'Contains',
  StartsWith: 'Starts with',
  EndsWith: 'Ends with',
  Exact: 'Exact',
  Regex: 'Regex'
};

export interface Icon {
  name: string;
  path: string;
}

export interface IRule {
  id: string;
  name: string;
  url: string;
  operator: string;
  title: string;
  icon: string;
  iconUrl: string;
}

export class Rule implements IRule {
  id: string;
  name: string;
  url: string;
  operator: string;
  icon: string;
  title: string;
  iconUrl: string;
}

export class StorageRules {
  envGuard: IRule[];
  constructor (rules: IRule[]) {
    this.envGuard = rules;
  }
}
