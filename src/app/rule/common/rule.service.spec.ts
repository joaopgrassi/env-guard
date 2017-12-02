import { async, TestBed } from '@angular/core/testing';
import { ChromeStorageService } from './index';
import { RuleService } from './rule.service';
import { HttpClientModule } from '@angular/common/http';
import { Icon, IIcon, IRule, Rule } from './rule-model';
import { Observable } from 'rxjs/Observable';

class MockedChromeStorageService {

  public static mockedRules: IRule[] = [
    new Rule(null, 'Production', 'http://production.com', 'Exact', 'Production', null),
    new Rule(null, 'Staging', 'http://staging.com', 'Exact', 'Staging', null)
  ];

  getAllFromLocalStorage$: Observable<IRule[]> = Observable.of(MockedChromeStorageService.mockedRules);
  getAllFromLocalStorage(): Observable<IRule[]> {
    return this.getAllFromLocalStorage$;
  }

  setAll(rules: IRule[]): Observable<any> {
    return Observable.of({});
  }
}

describe('RuleService', () => {
  let ruleService: RuleService;
  let chromeStorageService: ChromeStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: ChromeStorageService, useClass: MockedChromeStorageService },
        RuleService
      ]
    });
  }));

  beforeEach(() => {
    ruleService = TestBed.get(RuleService);
    chromeStorageService = TestBed.get(ChromeStorageService);
  });

  it('should create service', () => {
    expect(ruleService).toBeDefined();
  });

  it('should get default icons', () => {
    ruleService.getDefaultIcons().subscribe((icons: IIcon[]) => {
      expect(icons.length).toBe(3);
    });
  });

  it('should get all rules from chrome storage', () => {
    spyOn(chromeStorageService, 'getAllFromLocalStorage').and.callThrough();

    ruleService.getAllRules().subscribe((rules: IRule[]) => {
      expect(rules).toEqual(MockedChromeStorageService.mockedRules);
      expect(chromeStorageService.getAllFromLocalStorage).toHaveBeenCalled();
    });
  });

  it('should call save rules on chrome storage service', () => {
    spyOn(chromeStorageService, 'setAll').and.callThrough();
    const expectedRules = MockedChromeStorageService.mockedRules;

    ruleService.saveRules(expectedRules).subscribe(() => {
      expect(chromeStorageService.setAll).toHaveBeenCalledWith(expectedRules);
    });
  });

});
