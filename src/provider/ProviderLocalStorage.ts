import { ProviderEventEmitter } from './ProviderEventEmitter';
import { ProviderStorage, ProviderStorageKey } from './types';

const LOCALSTORAGE_KEY = 'GrinderyWalletProvider';

/**
 * @summary A local storage class for the provider
 * @since 0.1.0
 * @extends ProviderEventEmitter
 */
export class ProviderLocalStorage extends ProviderEventEmitter {
  /**
   * @summary Gets the value of the storage by the key
   * @param {ProviderStorageKey} key Provider storage key
   * @returns {string} The value of the storage by the key
   */
  protected getStorageValue(key: ProviderStorageKey): string {
    const value = this.getStorage()[key] || '';
    return value;
  }

  /**
   * @summary Sets the value of the storage by the key
   * @param {ProviderStorageKey} key Provider storage key
   * @param {string} value The value to set
   */
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
