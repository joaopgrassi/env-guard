import { async, TestBed } from '@angular/core/testing';
import { RuleBrowserStorageService } from './index';
import { RuleService } from './rule.service';
import { HttpClientModule } from '@angular/common/http';
import { Icon, IIcon, IRule, Rule } from './rule-model';
import { Observable } from 'rxjs/Observable';

class MockedRuleBrowserStorageService {

  public static mockedRules: IRule[] = [
    new Rule(null, 'Production', 'http://production.com', 'Exact', 'Production', null),
    new Rule(null, 'Staging', 'http://staging.com', 'Exact', 'Staging', null)
  ];

  getAllFromLocalStorage$: Observable<IRule[]> = Observable.of(MockedRuleBrowserStorageService.mockedRules);
  getAll(): Observable<IRule[]> {
    return this.getAllFromLocalStorage$;
  }

  setAll(rules: IRule[]): Observable<any> {
    return Observable.of({});
  }
}

describe('RuleService', () => {
  let ruleService: RuleService;
  let ruleBrowserStorageService: RuleBrowserStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: RuleBrowserStorageService, useClass: MockedRuleBrowserStorageService },
        RuleService
      ]
    });
  }));

  beforeEach(() => {
    ruleService = TestBed.get(RuleService);
    ruleBrowserStorageService = TestBed.get(RuleBrowserStorageService);
  });

  it('should create service', () => {
    expect(ruleService).toBeDefined();
  });

  it('should get default icons', () => {
    ruleService.getDefaultIcons().subscribe((icons: IIcon[]) => {
      expect(icons.length).toBe(4);
    });
  });

  it('should get all rules from chrome storage', () => {
    spyOn(ruleBrowserStorageService, 'getAll').and.callThrough();

    ruleService.getAllRules().subscribe((rules: IRule[]) => {
      expect(rules).toEqual(MockedRuleBrowserStorageService.mockedRules);
      expect(ruleBrowserStorageService.getAll).toHaveBeenCalled();
    });
  });

  it('should call save rules on chrome storage service', () => {
    spyOn(ruleBrowserStorageService, 'setAll').and.callThrough();
    const expectedRules = MockedRuleBrowserStorageService.mockedRules;

    ruleService.saveRules(expectedRules).subscribe(() => {
      expect(ruleBrowserStorageService.setAll).toHaveBeenCalledWith(expectedRules);
    });
  });

});
