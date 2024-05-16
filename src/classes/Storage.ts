import { uuid } from '../utils/uuid';

const LOCALSTORAGE_KEY = 'GrinderyWalletProvider';

/**
 * @summary Storage keys
 * @since 0.2.0
 */
export enum StorageKeys {
  pairingToken = 'pairingToken',
  sessionId = 'sessionId',
  connectUrl = 'connectUrl',
  connectUrlBrowser = 'connectUrlBrowser',
  shortToken = 'shortToken',
  clientId = 'clientId',
  address = 'address',
}

/**
 * @summary Storage key type
 * @since 0.2.0
 */
export type StorageKey = keyof typeof StorageKeys;

export type StorageSnapshot = {
  [key in StorageKeys]?: string;
};

/**
 * @summary A class to handle local storage
 * @since 0.2.0
 */
export class Storage {
  /**
   * @summary Gets the value of the storage by the key
   * @public
   * @param {StorageKey} key Provider storage key
   * @returns {string} The value of the storage by the key
   */
  public getValue(key: StorageKey): string {
    const value = this.getSnapshot()[key] || '';
    return value;
  }

  /**
   * @summary Sets the value of the storage by the key
   * @public
   * @param {StorageKey} key Provider storage key
   * @param {string} value The value to set
   * @returns {void}
   */
  public setValue(key: StorageKey, value: string): string {
    const snapshot = this.getSnapshot();
    snapshot[key] = value;
    this.saveSnapshot(snapshot);
    return value;
  }

  /**
   * @summary Clears the storage
   * @public
   * @returns {void}
   */
  public clear(): void {
    this.saveSnapshot({
      clientId: this.getSnapshot().clientId || uuid(),
    });
  }

  /**
   * @summary Gets the storage
   * @since 0.2.0
   * @returns {StorageSnapshot} The storage snapshot object
   */
  private getSnapshot(): StorageSnapshot {
    try {
      return JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY) || '{}'
      ) as StorageSnapshot;
    } catch (error) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({}));
      throw new Error('Error parsing storage');
    }
  }

  /**
   * @summary Saves the storage
   * @since 0.2.0
   * @param {StorageSnapshot} storage Storage snapshot object
   */
  private saveSnapshot(storage: StorageSnapshot): void {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage));
  }
}
