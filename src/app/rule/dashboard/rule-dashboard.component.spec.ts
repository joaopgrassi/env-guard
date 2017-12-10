import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppMaterialModule } from '../../app-material.module';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { AppStore } from '../../store/app.store';
import { MockedChromeStorageService, MockedNotificationService, MockedRouter } from '../../../_mocks/mocks';

import { RuleDashboardComponent } from './rule-dashboard.component';
import { NotificationService } from '../../common/notification.service';

import { Icon, IIcon, IRule, Rule } from '../common/rule-model';
import { ChromeStorageService, RuleActions, RuleService } from '../common/';
import { IAppStore } from '../../store/common/store.model';

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

describe('RuleDashboardComponent', () => {
  let component: RuleDashboardComponent;
  let fixture: ComponentFixture<RuleDashboardComponent>;
  let store: Store<IAppStore>;
  let actions: RuleActions;
  let router: MockedRouter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, AppStore],
      providers: [
        { provide: Router, useClass: MockedRouter },
        { provide: RuleActions, useValue: new RuleActions() },
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
    store = TestBed.get(Store);
    actions = TestBed.get(RuleActions);
    router = TestBed.get(Router);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate').and.stub();

    // load data into the store before test starts
    store.dispatch(actions.loadRuleSuccess(MockedRuleService.mockedRules));

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('add new rule - should dispatch an action to load new rule and navigate to add page', () => {
    const addButton = fixture.debugElement.query(By.css('.data-test-addButton'));
    addButton.triggerEventHandler('click', null);

    const expectedAction = actions.getRule('');
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    expect(router.navigate).toHaveBeenCalledWith(['rules/add']);
  });

  it('edit rule - should navigate to edit page with correct rule id', () => {
    const expectedRule = MockedRuleService.mockedRules[0];

    const tableEditButton = fixture.debugElement
      .query(By.css('.mat-header-row+ .mat-row .mat-icon-button:nth-child(1)'));
    tableEditButton.triggerEventHandler('click', null);

    expect(router.navigate).toHaveBeenCalledWith([`rules/${expectedRule.id}`]);
  });

  it('duplicate rule - should dispatch and navigate to correct duplicated rule', () => {
    spyOn(actions, 'addRule').and.callThrough();

    const ruleToDuplicate = MockedRuleService.mockedRules[0];
    const expectedName = `${ruleToDuplicate.name} - Copy`;

    const tableDuplicateButton = fixture.debugElement
      .query(By.css('.mat-header-row+ .mat-row .mat-icon-button:nth-child(2)'));
    tableDuplicateButton.triggerEventHandler('click', null);

    expect((actions.addRule as any).calls.mostRecent().args[0].name).toEqual(expectedName);
  });

  it('delete rule - should dispatch delete action with correct rule', () => {
    const ruleToDelete = MockedRuleService.mockedRules[0];
    const expectedAction = actions.deleteRule(ruleToDelete);

    const tableDuplicateButton = fixture.debugElement
      .query(By.css('.mat-header-row+ .mat-row .mat-icon-button:nth-child(3)'));
    tableDuplicateButton.triggerEventHandler('click', null);

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

});
