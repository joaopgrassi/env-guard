import { Injectable } from '@angular/core';
import { IRule, StorageRules } from './rule-model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Injectable()
export class ChromeStorageService {

  constructor() {
  }

  /**
   * Sets all rules to the chrome storage.
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
        localStorage.setItem(Object.keys(storage)[0], JSON.stringify(storage.envMagic));
        resolve(true);
      }
    }));
  }
}
