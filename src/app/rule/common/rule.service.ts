import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Icon, IRule } from './rule-model';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ChromeStorageService } from './chrome-storage.service';

@Injectable()
export class RuleService {

  constructor(private http: HttpClient,
              private chromeStorage: ChromeStorageService) {  }

  /**
   * Returns the list of default icons
   * @returns {Observable<Icon[]>}
   */
  getDefaultIcons(): Observable<Icon[]> {
    return this.http.get('assets/default-icons.json')
      .map((response: Icon[]) => {
          return response;
        }
      );
  }

  /**
   * Syncs the payload in memory to local storage
   * @param {IRule[]} rules
   * @returns {Promise<any>}
   */
  saveRules(rules: IRule[]) {
    return this.chromeStorage.setAll(rules);
  }

  /**
   * Get all rules
   * @returns {Observable<IRule[]>}
   */
  getAllRules(): Observable<IRule[]> {
    return this.chromeStorage.getAllFromLocalStorage();
  }
}
