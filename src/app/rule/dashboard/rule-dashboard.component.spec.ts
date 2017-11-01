import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppMaterialModule } from '../../app-material.module';

import { AppStore } from '../../store/app.store';
import { MockedNotificationService, MockedChromeStorageService, MockedRouter } from '../../../_mocks/mocks';

import { RuleDashboardComponent } from './rule-dashboard.component';
import { NotificationService } from '../../common/notification.service';

import { IIcon, IRule, Rule, Icon } from '../common/rule-model';
import { ChromeStorageService, RuleService, RuleActions } from '../common/';

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

fdescribe('RuleDashboardComponent', () => {
  let component: RuleDashboardComponent;
  let fixture: ComponentFixture<RuleDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, AppStore],
      providers: [
        { provide: Router, useClass: MockedRouter },
        { provide: RuleActions },
        { provide: NotificationService, useClass: MockedNotificationService },
        { provide: ChromeStorageService, useClass: MockedChromeStorageService },
        { provide: RuleService, useClass: MockedRuleService }
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
