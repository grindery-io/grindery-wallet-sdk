/**
 * @summary Storage keys
 * @since 0.2.0
 */
export declare enum StorageKeys {
    pairingToken = "pairingToken",
    sessionId = "sessionId",
    connectUrl = "connectUrl",
    connectUrlBrowser = "connectUrlBrowser",
    shortToken = "shortToken",
    clientId = "clientId",
    address = "address"
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
export declare class Storage {
    /**
     * @summary Gets the value of the storage by the key
     * @public
     * @param {StorageKey} key Provider storage key
     * @returns {string} The value of the storage by the key
     */
    getValue(key: StorageKey): string;
    /**
     * @summary Sets the value of the storage by the key
     * @public
     * @param {StorageKey} key Provider storage key
     * @param {string} value The value to set
     * @returns {void}
     */
    setValue(key: StorageKey, value: string): string;
    /**
     * @summary Clears the storage
     * @public
     * @returns {void}
     */
    clear(): void;
    /**
     * @summary Gets the storage
     * @since 0.2.0
     * @returns {StorageSnapshot} The storage snapshot object
     */
    private getSnapshot;
    /**
     * @summary Saves the storage
     * @since 0.2.0
     * @param {StorageSnapshot} storage Storage snapshot object
     */
    private saveSnapshot;
}
