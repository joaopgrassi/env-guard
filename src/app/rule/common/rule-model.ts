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
  name: string;
  url: string;
  operator: string;
  title: string;
  icon: string;
  iconUrl: string;
}

export class Rule implements IRule {
  name: string;
  url: string;
  operator: string;
  icon: string;
  title: string;
  iconUrl: string;
}

export class StorageRules {
  envMagic: IRule[];
  constructor (rules: IRule[]) {
    this.envMagic = rules;
  }
}
