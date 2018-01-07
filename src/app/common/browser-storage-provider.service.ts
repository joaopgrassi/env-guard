import { Inject, Injectable } from '@angular/core';

export interface IStorage {
  storage: any;
  type: StorageType;
}

export enum StorageType {
  Chrome,
  LocalStorage
}

@Injectable()
export class BrowserStorageProvider {

  constructor(@Inject('Chrome') private chrome) {

  }

  /**
   * Returns the available store on the browser.
   * @returns {IStorage}
   */
  getStorage (): IStorage {
    if (this.chrome !== undefined && this.chrome.storage !== undefined) {
      return <IStorage> {
        storage: this.chrome.storage,
        type: StorageType.Chrome
      };
    }
    return  <IStorage> {
      storage: localStorage,
      type: StorageType.LocalStorage
    };
  }
}
