import { ProviderStorageKey } from '../types';
import { WalletProviderEventEmitter } from './WalletProviderEventEmitter';
/**
 * @summary A local storage class for the provider
 * @since 0.1.0
 * @extends WalletProviderEventEmitter
 */
export declare class WalletProviderLocalStorage extends WalletProviderEventEmitter {
    /**
     * @summary Gets the value of the storage by the key
     * @protected
     * @param {ProviderStorageKey} key Provider storage key
     * @returns {string} The value of the storage by the key
     */
    protected getStorageValue(key: ProviderStorageKey): string;
    /**
     * @summary Sets the value of the storage by the key
     * @protected
     * @param {ProviderStorageKey} key Provider storage key
     * @param {string} value The value to set
     * @returns {void}
     */
    protected setStorageValue(key: ProviderStorageKey, value: string): string;
    /**
     * @summary Clears the storage
     * @protected
     * @returns {void}
     */
    protected clearStorage(): void;
    /**
     * @summary Gets the provider storage
     * @returns {ProviderStorage} The provider storage
     */
    private getStorage;
    /**
     * @summary Saves the provider storage
     * @param {ProviderStorage} storage Provider storage object
     */
    private saveStorage;
}
