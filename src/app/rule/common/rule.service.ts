import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { RuleBrowserStorageService } from './rule-browser-storage.service';
import { IIcon, IRule } from './rule-model';

@Injectable()
export class RuleService {

  constructor(private http: HttpClient,
              private chromeStorage: RuleBrowserStorageService) {  }

  /**
   * Returns the list of default icons
   * @returns {Observable<IIcon[]>}
   */
  getDefaultIcons(): Observable<IIcon[]> {
    return this.http.get('assets/default-icons.json')
      .map((response: IIcon[]) => {
          return response;
        }
      );
  }

  /**
   * Syncs the payload in memory to local storage
   * @param {IRule[]} rules
   * @returns {Promise<any>}
   */
  saveRules(rules: IRule[]): Observable<boolean> {
    return this.chromeStorage.setAll(rules);
  }

  /**
   * Get all rules
   * @returns {Observable<IRule[]>}
   */
  getAllRules(): Observable<IRule[]> {
    return this.chromeStorage.getAll();
  }
}
