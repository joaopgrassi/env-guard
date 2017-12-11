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
    new Icon('Production', 'prod', 'icons/red.png', '#EB1342'),
    new Icon('Staging', 'staging', 'icons/blue.png', '#579AF2'),
    new Icon('Development', 'dev', 'icons/green.png', '#0ECC7D')
  ];

  public static mockedRules: IRule[] = [
    new Rule(null, 'Production', 'http://production.com', 'Exact', 'Production', MockedRuleService.mockedIcons[0]),
    new Rule(null, 'Staging', 'http://staging.com', 'Exact', 'Staging', MockedRuleService.mockedIcons[1])
  ];

  getAllDefaultIcons$: Observable<IIcon[]> = Observable.of(MockedRuleService.mockedIcons);
  getDefaultIcons(): Observable<IIcon[]> {
    return this.getAllDefaultIcons$;
  }
}

describe('RuleDetailsComponent', () => {
  let component: RuleDetailsComponent;
  let fixture: ComponentFixture<RuleDetailsComponent>;
  let router: Router;
  let activateRoute = new MockedActivatedRoute();
  let store: Store<IAppStore>;
  let actions: RuleActions;
  let ruleService: RuleService;

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
    ruleService = TestBed.get(RuleService);

    spyOn(store, 'dispatch').and.callThrough();

    // load data into the store before test starts
    store.dispatch(actions.loadRuleSuccess(MockedRuleService.mockedRules));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load environment icons on ngInit', fakeAsync(() => {
    spyOn(ruleService, 'getDefaultIcons').and.callThrough();

    fixture.detectChanges();

    expect(ruleService.getDefaultIcons).toHaveBeenCalled();
  }));

  it('should navigate to dashboard on cancel click', fakeAsync(() => {
    spyOn(router, 'navigate').and.callThrough();
    spyOn(component, 'cancel').and.callThrough();

    const cancelButton = fixture.nativeElement.querySelector('button[data-spec-cancel]');
    cancelButton.click();

    fixture.detectChanges();

    expect(component.cancel).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['rules/dashboard']);
  }));

  it('should initialize new rule if no id passed on url', () => {
    activateRoute.testParamMap = { id: 'add' };

    expect(component.currentRule).toEqual(<IRule>{});
  });

  it('should dispatch addRule action to store on new rule save', () => {
    spyOn(actions, 'addRule').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();

    fixture.autoDetectChanges();

    activateRoute.testParamMap = { id: 'add' };

    // Set new rule to the form
    const expectedRule = new Rule(null, 'Test', 'http://test.com', 'Exact', 'Development',
      MockedRuleService.mockedIcons[2]);
    component.ruleForm.patchValue(expectedRule);
    component.ruleForm.get('icon').setValue(expectedRule.icon.key);

    const expectedAction = actions.addRule(expectedRule);

    // Act
    const saveButton = fixture.nativeElement.querySelector('button[data-spec-save]');
    saveButton.click();

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    expect((actions.addRule as any).calls.mostRecent().args[0]).toEqual(expectedRule);
    expect(router.navigate).toHaveBeenCalledWith(['rules/dashboard']);
  });

  it('should load rule from store if id is passed on url', () => {
    const expectedRule = MockedRuleService.mockedRules[0];
    fixture.autoDetectChanges();

    activateRoute.testParamMap = { id: expectedRule.id };

    expect(component.currentRule).toEqual(expectedRule);
    expect(component.ruleForm.value.id).toEqual(expectedRule.id);
  });

  it('should dispatch saveRule action to store on editing existing rule', () => {
    spyOn(actions, 'saveRule').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();

    fixture.autoDetectChanges();

    const expectedRule = MockedRuleService.mockedRules[0];
    activateRoute.testParamMap = { id: expectedRule.id };

    // Change the name of the rule
    expectedRule.name = `${expectedRule.name} - Edited`;
    component.ruleForm.get('name').setValue(expectedRule.name);
    const expectedAction = actions.saveRule(expectedRule);

    // Act
    const saveButton = fixture.nativeElement.querySelector('button[data-spec-save]');
    saveButton.click();

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    expect((actions.saveRule as any).calls.mostRecent().args[0]).toEqual(expectedRule);
    expect(router.navigate).toHaveBeenCalledWith(['rules/dashboard']);
  });

});
