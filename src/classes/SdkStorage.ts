import { CHAINS } from '../utils/chains';
import { uuid } from '../utils/uuid';

const LOCALSTORAGE_KEY = 'GrinderyWalletProvider';

/**
 * @summary SdkStorage keys
 * @since 0.2.0
 */
export enum SdkStorageKeys {
  pairingToken = 'pairingToken',
  sessionId = 'sessionId',
  connectUrl = 'connectUrl',
  connectUrlBrowser = 'connectUrlBrowser',
  shortToken = 'shortToken',
  clientId = 'clientId',
  address = 'address',
  chainId = 'chainId',
}

/**
 * @summary SdkStorage key type
 * @since 0.2.0
 */
export type SdkStorageKey = keyof typeof SdkStorageKeys;

export type SdkStorageSnapshot = {
  [key in SdkStorageKeys]?: string;
};

/**
 * @summary A class to handle local storage
 * @since 0.2.0
 */
export class SdkStorage {
  /**
   * @summary Gets the value of the storage by the key
   * @public
   * @param {SdkStorageKey} key Provider storage key
   * @returns {string} The value of the storage by the key
   */
  public getValue(key: SdkStorageKey): string {
    const value = this.getSnapshot()[key] || '';
    return value;
  }

  /**
   * @summary Sets the value of the storage by the key
   * @public
   * @param {SdkStorageKey} key Provider storage key
   * @param {string} value The value to set
   * @returns {void}
   */
  public setValue(key: SdkStorageKey, value: string): string {
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
      chainId: this.getSnapshot().chainId || CHAINS[0],
    });
  }

  /**
   * @summary Gets the storage
   * @since 0.2.0
   * @returns {SdkStorageSnapshot} The storage snapshot object
   */
  private getSnapshot(): SdkStorageSnapshot {
    try {
      return JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY) || '{}'
      ) as SdkStorageSnapshot;
    } catch (error) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({}));
      throw new Error('Error parsing storage');
    }
  }

  /**
   * @summary Saves the storage
   * @since 0.2.0
   * @param {SdkStorageSnapshot} storage SdkStorage snapshot object
   */
  private saveSnapshot(storage: SdkStorageSnapshot): void {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage));
  }
}
