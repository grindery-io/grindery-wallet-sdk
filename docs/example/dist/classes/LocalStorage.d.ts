import { EventEmitter } from './EventEmitter';
import { ProviderStorageKey } from '../types';
/**
 * @summary A local storage class for the provider
 * @since 0.1.0
 * @extends EventEmitter
 */
export declare class ProviderLocalStorage extends EventEmitter {
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
    protected setStorageValue(key: ProviderStorageKey, value: string): void;
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