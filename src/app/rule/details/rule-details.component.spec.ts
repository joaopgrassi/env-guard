import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AppStore } from '../../store/app.store';
import { AppMaterialModule } from '../../app-material.module';
import { NotificationService } from '../../common/notification.service';
import {
MockedChromeStorageService, MockedRouter, MockedNotificationService,
MockedActivatedRoute
} from '../../../_mocks/mocks';

import { RuleActions, RuleService, ChromeStorageService} from '../common/';
import { RuleDetailsComponent } from './rule-details.component';
import { Icon, IIcon, IRule, Rule } from '../common/rule-model';

class MockedRuleService {

  public static mockedIcons: IIcon[] = [
    new Icon('Production', 'prod', 'icons/red.png'),
    new Icon('Staging', 'staging', 'icons/green.png')
  ];

  public static mockedRules: IRule[] = [
    new Rule(null, 'Production', 'http://production.com', 'Exact', 'Production', MockedRuleService.mockedIcons[0]),
    new Rule(null, 'Staging', 'http://staging.com', 'Exact', 'Staging', MockedRuleService.mockedIcons[1])
  ];

  getAllRules$: Observable<IRule[]> = Observable.of(MockedRuleService.mockedRules);
  getAllDefaultIcons$: Observable<IIcon[]> = Observable.of(MockedRuleService.mockedIcons);

  getDefaultIcons(): Observable<IIcon[]> {
    return this.getAllDefaultIcons$;
  }

  saveRules(rules: IRule[]) {
  }

  getAllRules(): Observable<IRule[]> {
    return this.getAllRules$;
  }
}

describe('RuleDetailsComponent', () => {
  let component: RuleDetailsComponent;
  let fixture: ComponentFixture<RuleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, AppStore, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useClass: MockedRouter },
        { provide: ActivatedRoute, useClass: MockedActivatedRoute },
        { provide: RuleActions, useValue: new RuleActions() },
        { provide: NotificationService, useClass: MockedNotificationService },
        { provide: ChromeStorageService, useClass: MockedChromeStorageService },
        { provide: RuleService, useClass: MockedRuleService }
      ],
      declarations: [ RuleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
