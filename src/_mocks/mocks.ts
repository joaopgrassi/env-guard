import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { IRule } from '../app/rule/common/rule-model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';

export class MockedNotificationService {
  notifySuccess(message: string) {
  }

  notifyError(message: string) {
  }

  notifyAlert(message: string) {
  }
}

export class MockedChromeStorageService {
  setAll(rules: IRule[]): Observable<any> {
    return Observable.of({});
  }

  getAllFromLocalStorage(): Observable<IRule[]> {
    return Observable.of([]);
  }
}

export class MockedRouter {
  events: Subject<any> = new Subject();
  navigate() {
  }
}

export class MockedActivatedRoute {
  private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
  paramMap = this.subject.asObservable();
  private _testParamMap: ParamMap;

  get testParamMap() {
    return this._testParamMap;
  }

  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }

  get snapshot() {
    return { paramMap: this.testParamMap };
  }
}
