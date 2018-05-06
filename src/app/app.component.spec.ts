import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppMaterialModule } from './app-material.module';
import { AppStore } from './store/app.store';
import { NotificationService } from './common/notification.service';

import { MockedRuleBrowserStorageService, MockedNotificationService, MockedRouter } from '../_mocks/mocks';

import { HeaderComponent } from './_layout/header.component';
import { AppComponent } from './app.component';
import { RuleBrowserStorageService, RuleService } from './rule/common/';
import { Icon, IIcon, IRule, Rule } from './rule/common/rule-model';

class MockedRuleService {

  public static mockedIcons: IIcon[] = [
    new Icon('Production', 'prod', 'icons/red.png', '#EB1342'),
    new Icon('Staging', 'staging', 'icons/green.png', '#579AF2')
  ];

  public static mockedRules: IRule[] = [
    new Rule(null, 'Production', 'http://production.com', 'Exact', 'Production', MockedRuleService.mockedIcons[0]),
    new Rule(null, 'Staging', 'http://staging.com', 'Exact', 'Staging', MockedRuleService.mockedIcons[1])
  ];

  getAllRules$: Observable<IRule[]> = Observable.of(MockedRuleService.mockedRules);
  getAllRules(): Observable<IRule[]> {
    return this.getAllRules$;
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, AppStore, BrowserAnimationsModule],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useClass: MockedRouter },
        { provide: NotificationService, useClass: MockedNotificationService },
        { provide: RuleBrowserStorageService, useClass: MockedRuleBrowserStorageService },
        { provide: RuleService, useClass: MockedRuleService }
      ],
      declarations: [
        AppComponent, HeaderComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
