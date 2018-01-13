import { TestBed } from '@angular/core/testing';
import { RuleBrowserStorageService } from './rule-browser-storage.service';
import { BrowserStorageProvider } from '../../common';
import { IStorage, StorageType } from '../../common';

class MockedBrowserStorageProvider {
  // used to mock chrome.
  public useChromeStorage: boolean;

  public mockedChrome = {
    sync: {
      set: function (items: any) {
      },
      get: function (key: string) {
      }
    }
  };
  public mockedLocalStorage = {
    setItem: function () {
    },
    getItem: function () {
    },
    length: 0
  };

  getStorage(): IStorage {
    if (this.useChromeStorage) {
      return <IStorage> {
        storage: this.mockedChrome,
        type: StorageType.Chrome
      };
    }
    return <IStorage> {
      storage: this.mockedLocalStorage,
      type: StorageType.LocalStorage
    };
  }

}

describe('RuleBrowserStorageService', () => {
  let ruleBrowserStorageService: RuleBrowserStorageService;
  let browserStorageProvider: MockedBrowserStorageProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RuleBrowserStorageService,
        { provide: BrowserStorageProvider, useClass: MockedBrowserStorageProvider }
      ]
    });
  });

  beforeEach(() => {

  });

  it('should be created', () => {
    ruleBrowserStorageService = TestBed.get(RuleBrowserStorageService);
    browserStorageProvider = TestBed.get(BrowserStorageProvider);
    expect(ruleBrowserStorageService).toBeTruthy();
  });

  it('chrome storage - should call get all', () => {
    // sets mock to return chrome storage
    browserStorageProvider = TestBed.get(BrowserStorageProvider);
    browserStorageProvider.useChromeStorage = true;

    ruleBrowserStorageService = TestBed.get(RuleBrowserStorageService);
    spyOn(browserStorageProvider.mockedChrome.sync, 'get');

    // Act
    ruleBrowserStorageService.getAll();

    expect(browserStorageProvider.mockedChrome.sync.get).toHaveBeenCalled();
  });

  it('chrome storage - should call set all', () => {
    // sets mock to return chrome storage
    browserStorageProvider = TestBed.get(BrowserStorageProvider);
    browserStorageProvider.useChromeStorage = true;

    ruleBrowserStorageService = TestBed.get(RuleBrowserStorageService);
    spyOn(browserStorageProvider.mockedChrome.sync, 'set');

    // Act
    ruleBrowserStorageService.setAll([]);

    expect(browserStorageProvider.mockedChrome.sync.set).toHaveBeenCalled();
  });

  it('local storage - should call get all', () => {
    // sets mock to return local storage
    browserStorageProvider = TestBed.get(BrowserStorageProvider);
    browserStorageProvider.useChromeStorage = false;

    ruleBrowserStorageService = TestBed.get(RuleBrowserStorageService);
    spyOn(browserStorageProvider.mockedLocalStorage, 'getItem');

    // Act
    ruleBrowserStorageService.getAll();

    expect(browserStorageProvider.mockedLocalStorage.getItem).toHaveBeenCalled();
  });

  it('local storage - should call set all', () => {
    // sets mock to return local storage
    browserStorageProvider = TestBed.get(BrowserStorageProvider);
    browserStorageProvider.useChromeStorage = false;

    ruleBrowserStorageService = TestBed.get(RuleBrowserStorageService);
    spyOn(browserStorageProvider.mockedLocalStorage, 'setItem');

    // Act
    ruleBrowserStorageService.setAll([]);

    expect(browserStorageProvider.mockedLocalStorage.setItem).toHaveBeenCalled();
  });

});


