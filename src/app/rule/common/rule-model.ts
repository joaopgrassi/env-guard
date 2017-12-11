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
  iconBaseColor: string;
}

export class Icon implements IIcon {
  name: string;
  key: string;
  path: string;
  iconBaseColor: string;

  /***
   * Creates a new Icon
   * @param {string} name
   * @param {string} key
   * @param {string} path
   * @param {string} iconBaseColor
   */
  constructor(name: string, key: string, path: string, iconBaseColor: string) {
    this.name = name;
    this.key = key;
    this.path = path;
    this.iconBaseColor = iconBaseColor;
  }
}

export interface IRuleBanner {
  text: string;
  bgColor: string;
  textColor: string;
}

export class RuleBanner implements IRuleBanner {
  text: string;
  bgColor: string;
  textColor: string;

  constructor(text: string, bgColor: string, textColor: string) {
    this.text = text;
    this.bgColor = bgColor;
    this.textColor = textColor;
  }
}

export interface IRule {
  id: string;
  name: string;
  url: string;
  operator: string;
  title: string;
  icon: Icon;
  banner: IRuleBanner;
}

export class Rule implements IRule {
  id: string;
  name: string;
  url: string;
  operator: string;
  title: string;
  icon: Icon;
  banner: IRuleBanner;

  /**
   * Creates a new instance of Rule
   * @param {string} id
   * @param {string} name
   * @param {string} url
   * @param {string} operator
   * @param {string} title
   * @param {Icon} icon
   * @param {IRuleBanner} banner
   */
  constructor(id: string, name: string, url: string, operator: string, title: string, icon: Icon, banner?: IRuleBanner) {
    this.id = id || uuid();
    this.name = name;
    this.url = url;
    this.operator = operator;
    this.title = title;
    this.icon = icon;
    this.banner = banner;
  }

  public addRuleBanner(banner: IRuleBanner) {
    this.banner = banner;
  }
}

export class StorageRules {
  envGuard: IRule[];
  constructor (rules: IRule[]) {
    this.envGuard = rules;
  }
}
