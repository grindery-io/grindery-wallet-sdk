import { ProviderEventEmitter } from './ProviderEventEmitter';
import { ProviderStorage, ProviderStorageKey } from './types';

const LOCALSTORAGE_KEY = 'GrinderyWalletProvider';

export class ProviderLocalStorage extends ProviderEventEmitter {
  protected getStorageValue(key: ProviderStorageKey): string {
    const value = this.getStorage()[key] || '';
    return value;
  }

  protected setStorageValue(key: ProviderStorageKey, value: string): void {
    const storage = this.getStorage();
    storage[key] = value;
    this.saveStorage(storage);
  }

  private getStorage(): ProviderStorage {
    try {
      return JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY) || '{}'
      ) as ProviderStorage;
    } catch (error) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({}));
      throw new Error('Error parsing storage');
    }
  }

  private saveStorage(storage: ProviderStorage): void {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage));
  }
}
