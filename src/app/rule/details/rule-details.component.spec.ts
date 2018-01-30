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
  MockedRuleBrowserStorageService,
  MockedNotificationService,
  MockedRouter
} from '../../../_mocks/mocks';

import { RuleBrowserStorageService, IRuleBanner, RuleActions, RuleBanner, RuleService } from '../common/';
import { RuleDetailsComponent } from './rule-details.component';
import { Icon, IIcon, IRule, Rule } from '../common/rule-model';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../store/common/store.model';

class MockedRuleService {

  public static mockedIcons: IIcon[] = [
    new Icon('Production', 'prod', 'icons/red.png', '#EB1342'),
    new Icon('Staging', 'staging', 'icons/blue.png', '#579AF2'),
    new Icon('Development', 'dev', 'icons/green.png', '#0ECC7D'),
    new Icon('None', 'none', '', '')
  ];

  public static mockedRules: IRule[] = [
    new Rule(null, 'Production', 'http://production.com', 'Exact', 'Production', MockedRuleService.mockedIcons[0]),
    new Rule(null, 'Staging', 'http://staging.com', 'Exact', 'Staging', MockedRuleService.mockedIcons[1]),
    new Rule(
      null,
      'Development',
      'http://staging.com',
      'Exact',
      'Staging', MockedRuleService.mockedIcons[1],
      {
        text: 'Test',
        bgColor: MockedRuleService.mockedIcons[2].iconBaseColor,
        textColor: '#FFF'
      })
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
        { provide: RuleBrowserStorageService, useClass: MockedRuleBrowserStorageService },
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

    // load data into the store before test starts
    store.dispatch(actions.loadRuleSuccess(MockedRuleService.mockedRules));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load environment icons on ngInit', fakeAsync(() => {
    spyOn(ruleService, 'getDefaultIcons').and.callThrough();

    activateRoute.testParamMap = { id: 'add' };
    fixture.detectChanges();

    expect(ruleService.getDefaultIcons).toHaveBeenCalled();
  }));

  it('should show save button disabled if form is not valid', () => {

    activateRoute.testParamMap = { id: 'add' };
    fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelector('button[data-spec-save]');
    expect(saveButton.disabled).toBeTruthy();
  });

  it('should navigate to dashboard on cancel click', fakeAsync(() => {
    spyOn(router, 'navigate').and.callThrough();
    spyOn(component, 'cancel').and.callThrough();

    activateRoute.testParamMap = { id: 'add' };
    fixture.detectChanges();

    const cancelButton = fixture.nativeElement.querySelector('button[data-spec-cancel]');
    cancelButton.click();

    fixture.detectChanges();

    expect(component.cancel).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['rules/dashboard']);
  }));

  it('should initialize new rule if no id passed on url', () => {
    activateRoute.testParamMap = { id: 'add' };
    fixture.detectChanges();

    expect(component.currentRule).toEqual(<IRule>{});
  });

  it('should dispatch addRule action to store on new rule save', () => {
    spyOn(actions, 'addRule').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();

    activateRoute.testParamMap = { id: 'add' };
    fixture.detectChanges();

    // Set new rule to the form
    const expectedRule = new Rule(null, 'Test', 'http://test.com', 'Contains', 'Development',
      MockedRuleService.mockedIcons[2]);
    component.ruleForm.patchValue(expectedRule);
    component.ruleForm.get('icon').setValue(expectedRule.icon.key);
    fixture.detectChanges();

    // Act
    const saveButton = fixture.nativeElement.querySelector('button[data-spec-save]');
    saveButton.click();

    expect((actions.addRule as any).calls.mostRecent().args[0]).toEqual(expectedRule);
    expect(router.navigate).toHaveBeenCalledWith(['rules/dashboard']);
  });

  it('should not save if form is not valid', () => {
    spyOn(actions, 'addRule').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();

    activateRoute.testParamMap = { id: 'add' };
    fixture.detectChanges();

    // Set only required fields
    component.ruleForm.get('name').setValue('Test');
    component.ruleForm.get('operator').setValue('Exact');
    fixture.detectChanges();

    // Act
    component.save();

    expect(actions.addRule).not.toHaveBeenCalled();
  });

  it('should load rule from store if id is passed on url', () => {
    const expectedRule = MockedRuleService.mockedRules[0];

    activateRoute.testParamMap = { id: expectedRule.id };
    fixture.detectChanges();

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
    fixture.detectChanges();

    // Act
    const saveButton = fixture.nativeElement.querySelector('button[data-spec-save]');
    saveButton.click();

    expect((actions.saveRule as any).calls.mostRecent().args[0]).toEqual(expectedRule);
    expect(router.navigate).toHaveBeenCalledWith(['rules/dashboard']);
  });

  it('should add banner properties on new rule', () => {
    spyOn(actions, 'addRule').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();

    fixture.autoDetectChanges();
    activateRoute.testParamMap = { id: 'add' };

    const expectedBanner = <IRuleBanner>
      {
        text: 'Test',
        bgColor: MockedRuleService.mockedIcons[2].iconBaseColor,
        textColor: '#FFF'
      };

    const expectedRule = new Rule(null, 'Test', 'http://test.com', 'Exact', 'Development',
      MockedRuleService.mockedIcons[2]);

    // Set new rule to the form
    component.ruleForm.patchValue(expectedRule);
    component.ruleForm.get('icon').setValue(expectedRule.icon.key);
    fixture.detectChanges();

    // check the 'add banner'
    const addBannerCheckbox = fixture.nativeElement.querySelector('mat-checkbox label');
    addBannerCheckbox.click();
    fixture.detectChanges();

    expectedRule.addRuleBanner(expectedBanner);

    // Act
    const saveButton = fixture.nativeElement.querySelector('button[data-spec-save]');
    saveButton.click();

    expect((actions.addRule as any).calls.mostRecent().args[0]).toEqual(expectedRule);
    expect(router.navigate).toHaveBeenCalledWith(['rules/dashboard']);
  });

  it('should load banner properties on existing rule', () => {
    spyOn(actions, 'saveRule').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();

    const expectedRule = MockedRuleService.mockedRules[2];
    activateRoute.testParamMap = { id: expectedRule.id };
    fixture.detectChanges();

    // Change the name of the rule
    expectedRule.name = `${expectedRule.name} - Edited`;
    component.ruleForm.get('name').setValue(expectedRule.name);
    fixture.detectChanges();

    // Act
    const saveButton = fixture.nativeElement.querySelector('button[data-spec-save]');
    saveButton.click();

    expect((actions.saveRule as any).calls.mostRecent().args[0]).toEqual(expectedRule);
    expect(router.navigate).toHaveBeenCalledWith(['rules/dashboard']);
  });

  it('should be able to save rule without title and icon', () => {
    spyOn(actions, 'addRule').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();

    activateRoute.testParamMap = { id: 'add' };
    fixture.detectChanges();

    const expectedRule = new Rule(null, 'Test', 'http://test.com', 'Exact', '', void(0));

    // Set only required fields
    component.ruleForm.get('name').setValue(expectedRule.name);
    component.ruleForm.get('operator').setValue(expectedRule.operator);
    component.ruleForm.get('url').setValue(expectedRule.url);
    fixture.detectChanges();

    // Act
    const saveButton = fixture.nativeElement.querySelector('button[data-spec-save]');
    saveButton.click();

    const actual = (actions.addRule as any).calls.mostRecent().args[0];

    expect(actual.name).toEqual(expectedRule.name);
    expect(actual.operator).toEqual(expectedRule.operator);
    expect(actual.url).toEqual(expectedRule.url);
    expect(actual.title).toBe(null);
    expect(actual.icon).not.toBeDefined();
    expect(actual.banner).not.toBeDefined();
    expect(router.navigate).toHaveBeenCalledWith(['rules/dashboard']);
  });

  it('should add banner properties on new rule without icon set', () => {
    spyOn(actions, 'addRule').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();

    activateRoute.testParamMap = { id: 'add' };
    fixture.detectChanges();

    const expectedBanner = <IRuleBanner>
      {
        text: 'Test',
        // default banner color is red
        bgColor: MockedRuleService.mockedIcons[0].iconBaseColor,
        // default banner text color is white
        textColor: '#FFF'
      };

    const expectedRule = new Rule(null, 'Test', 'http://test.com', 'Exact', '', void(0));

    // Set new rule to the form
    component.ruleForm.patchValue(expectedRule);
    fixture.detectChanges();

    // check the 'add banner'
    const addBannerCheckbox = fixture.nativeElement.querySelector('mat-checkbox label');
    addBannerCheckbox.click();
    fixture.detectChanges();

    expectedRule.addRuleBanner(expectedBanner);

    // Act
    const saveButton = fixture.nativeElement.querySelector('button[data-spec-save]');
    saveButton.click();

    expect((actions.addRule as any).calls.mostRecent().args[0]).toEqual(expectedRule);
    expect(router.navigate).toHaveBeenCalledWith(['rules/dashboard']);
  });

});
