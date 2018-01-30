import { TestBed } from '@angular/core/testing';
import { BrowserStorageProvider, StorageType } from './browser-storage-provider.service';

describe('BrowserStorageProvider', () => {
  let storageService: BrowserStorageProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BrowserStorageProvider,
        { provide: 'Chrome', useValue: { storage: void(0) } }
      ]
    });
  });

  beforeEach(() => {
    storageService = TestBed.get(BrowserStorageProvider);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it('should return localStorage if chrome is not available', () => {
    const storage = storageService.getStorage();

    expect(storage.type).toEqual(StorageType.LocalStorage);
    expect(storage.storage).toBeDefined();
  });
});

describe('BrowserStorageProvider', () => {
  let storageService: BrowserStorageProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BrowserStorageProvider,
        { provide: 'Chrome', useValue: { storage: {} } }
      ]
    });
  });

  beforeEach(() => {
    storageService = TestBed.get(BrowserStorageProvider);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it('should return chrome storage if available', () => {
    const storage = storageService.getStorage();

    expect(storage.type).toEqual(StorageType.Chrome);
    expect(storage.storage).toBeDefined();
  });
});

