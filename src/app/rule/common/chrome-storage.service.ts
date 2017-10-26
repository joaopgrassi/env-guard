import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { IRule, StorageRules } from './rule-model';

@Injectable()
export class ChromeStorageService {

  private storage_key = 'envGuard';

  constructor() {
  }

  /**
   * Sets all rules to either local or chrome storage.
   * @param {IRule[]} rules
   */
  setAll(rules: IRule[]): Observable<any> {
    const storage = new StorageRules(rules);
    return Observable.from(new Promise((resolve, reject) => {
      if (chrome !== undefined && chrome.storage !== undefined) {
        chrome.storage.sync.set(storage, () => {

          if (!chrome.runtime.lastError) {
            resolve(true);
          } else {
            reject();
            // TODO: Handle error here
          }
        });
      } else {
        localStorage.setItem(this.storage_key, JSON.stringify(storage.envGuard));
        resolve(true);
      }
    }));
  }

  /**
   * gets all rules from either local or chrome storage.
   */
  getAllFromLocalStorage(): Observable<IRule[]> {
    return Observable.from(new Promise((resolve, reject) => {
      if (chrome !== undefined && chrome.storage !== undefined) {
        chrome.storage.sync.get(this.storage_key, (rules: IRule[]) => {
          if (!chrome.runtime.lastError) {
            resolve(rules);
          } else {
            reject();
            // TODO: Handle error here
          }
        });
      } else {
        resolve((localStorage.getItem(this.storage_key) === null) ? []
          : JSON.parse(localStorage.getItem(this.storage_key)));
      }
    }));
  }
}
