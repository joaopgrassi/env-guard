import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDashboardComponent } from './rule-dashboard.component';
import { NotificationService } from '../../common/notification.service';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

import { Icon, IRule } from '../common/rule-model';
import { Observable } from 'rxjs/Observable';
import { ChromeStorageService } from '../common/chrome-storage.service';
import { RuleService } from '../common/rule.service';

import { AppMaterialModule } from '../../app-material.module';
import { RuleActions } from '../common/rule.actions';
import { AppStore } from '../../store/app.store';


class MockedChromeStorageService {
  setAll(rules: IRule[]): Observable<any> {
    return Observable.of({});
  }

  getAllFromLocalStorage(): Observable<IRule[]> {
    return Observable.of([]);
  }
}

class MockedRuleService {
  getDefaultIcons(): Observable<Icon[]> {
    return Observable.of([]);
  }

  saveRules(rules: IRule[]) {
  }

  getAllRules(): Observable<IRule[]> {
    return Observable.of([]);
  }
}

class MockedNotificationService {
  notifySuccess(message: string) {
  }

  notifyError(message: string) {
  }

  notifyAlert(message: string) {
  }
}

class MockedRouter {
  events: Subject<any> = new Subject();

  navigate() {
  }
}

fdescribe('RuleDashboardComponent', () => {
  let component: RuleDashboardComponent;
  let fixture: ComponentFixture<RuleDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, AppStore ],
      providers: [
        { provide: Router, useClass: MockedRouter },
        { provide: ChromeStorageService, useClass: MockedChromeStorageService },
        { provide: RuleService, useClass: MockedRuleService },
        { provide: RuleActions },
        { provide: NotificationService, useClass: MockedNotificationService }
      ],

      declarations: [RuleDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
