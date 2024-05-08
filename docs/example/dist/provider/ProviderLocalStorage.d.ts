import { ProviderEventEmitter } from './ProviderEventEmitter';
import { ProviderStorageKey } from './types';
/**
 * @summary A local storage class for the provider
 * @since 0.1.0
 * @extends ProviderEventEmitter
 */
export declare class ProviderLocalStorage extends ProviderEventEmitter {
    /**
     * @summary Gets the value of the storage by the key
     * @param {ProviderStorageKey} key Provider storage key
     * @returns {string} The value of the storage by the key
     */
    protected getStorageValue(key: ProviderStorageKey): string;
    /**
     * @summary Sets the value of the storage by the key
     * @param {ProviderStorageKey} key Provider storage key
     * @param {string} value The value to set
     */
    protected setStorageValue(key: ProviderStorageKey, value: string): void;
    private getStorage;
    private saveStorage;
}
