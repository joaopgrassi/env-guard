import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AppStore } from '../../store/app.store';
import { AppMaterialModule } from '../../app-material.module';
import { NotificationService } from '../../common/notification.service';
import {
  MockedActivatedRoute,
  MockedChromeStorageService,
  MockedNotificationService,
  MockedRouter
} from '../../../_mocks/mocks';

import { ChromeStorageService, RuleActions, RuleService } from '../common/';
import { RuleDetailsComponent } from './rule-details.component';
import { Icon, IIcon, IRule, Rule } from '../common/rule-model';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../store/common/store.model';

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
  let router: Router;
  let activateRoute = new MockedActivatedRoute();
  let store: Store<IAppStore>;
  let actions: RuleActions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, AppStore, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: Router, useClass: MockedRouter },
        { provide: ActivatedRoute, useValue: activateRoute },
        { provide: RuleActions, useValue: new RuleActions() },
        { provide: NotificationService, useClass: MockedNotificationService },
        { provide: ChromeStorageService, useClass: MockedChromeStorageService },
        { provide: RuleService, useClass: MockedRuleService }
      ],
      declarations: [RuleDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleDetailsComponent);
    component = fixture.componentInstance;
    activateRoute = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    actions = TestBed.get(RuleActions);

    // load data into the store before test starts
    store.dispatch(actions.loadRuleSuccess(MockedRuleService.mockedRules));

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard on cancel click', fakeAsync(() => {
    spyOn(router, 'navigate').and.callThrough();

    activateRoute.testParamMap = { id: 'add' };

    const cancelButton = fixture.nativeElement.querySelector('button[data-spec-cancel]');
    cancelButton.click();

    expect(router.navigate).toHaveBeenCalledWith(['rules/dashboard']);
  }));

  it('should initialize new rule if no id passed on url', () => {
    activateRoute.testParamMap = { id: 'add' };

    expect(component.currentRule).toEqual(<IRule>{});
  });

  it('should load rule from store if id is passed on url', () => {
    const expectedRule = MockedRuleService.mockedRules[0];

    activateRoute.testParamMap = { id: expectedRule.id };

    expect(component.currentRule).toEqual(expectedRule);
    expect(component.ruleForm.value.id).toEqual(expectedRule.id);

  });

  it('should dispatch addRule action to store on new rule save', () => {

  });



  it('should dispatch saveRule action to store on editing existing rule', () => {

  });

});
