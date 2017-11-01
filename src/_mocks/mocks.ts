import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { IRule } from '../app/rule/common/rule-model';

export class MockedNotificationService {
  notifySuccess(message: string) {  }
  notifyError(message: string) {  }
  notifyAlert(message: string) {  }
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
  navigate() { }
}
