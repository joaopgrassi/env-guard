import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Icon } from './rule-model';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RuleService {

  constructor(private http: HttpClient) {  }

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
}
