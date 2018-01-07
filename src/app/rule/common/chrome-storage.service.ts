import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { IRule, StorageRules } from './rule-model';
import { IStorage, StorageType, BrowserStorageProvider } from '../../common';

@Injectable()
export class ChromeStorageService {

  private storage_key = 'envGuard';
  private browserStorage: IStorage;

  constructor(private browserStorageProvider: BrowserStorageProvider) {
    this.browserStorage = browserStorageProvider.getStorage();
  }

  /**
   * Sets all rules to either local or chrome storage.
   * @param {IRule[]} rules
   */
  setAll(rules: IRule[]): Observable<any> {
    const storage = new StorageRules(rules);
    return Observable.from(new Promise((resolve, reject) => {
      if (this.browserStorage.type === StorageType.Chrome) {
        this.browserStorage.storage.sync.set(storage, () => {
          resolve(true);
        });
      } else {
        this.browserStorage.storage.setItem(this.storage_key, JSON.stringify(storage.envGuard));
        resolve(true);
      }
    }));
  }

  /**
   * gets all rules from either local or chrome storage.
   */
  getAllFromLocalStorage(): Observable<IRule[]> {
    return Observable.from(new Promise((resolve, reject) => {
      if (this.browserStorage.type === StorageType.Chrome) {
        this.browserStorage.storage.sync.get(this.storage_key, (items: any) => {
          resolve(items[this.storage_key]);
        });
      } else {
        resolve((this.browserStorage.storage.getItem(this.storage_key) === null) ? []
          : JSON.parse(this.browserStorage.storage.getItem(this.storage_key)));
      }
    }));
  }
}
