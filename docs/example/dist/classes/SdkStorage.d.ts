/**
 * @summary SdkStorage keys
 * @since 0.2.0
 */
export declare enum SdkStorageKeys {
    pairingToken = "pairingToken",
    sessionId = "sessionId",
    connectUrl = "connectUrl",
    connectUrlBrowser = "connectUrlBrowser",
    shortToken = "shortToken",
    clientId = "clientId",
    address = "address",
    chainId = "chainId"
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
export declare class SdkStorage {
    /**
     * @summary Gets the value of the storage by the key
     * @public
     * @param {SdkStorageKey} key Provider storage key
     * @returns {string} The value of the storage by the key
     */
    getValue(key: SdkStorageKey): string;
    /**
     * @summary Sets the value of the storage by the key
     * @public
     * @param {SdkStorageKey} key Provider storage key
     * @param {string} value The value to set
     * @returns {void}
     */
    setValue(key: SdkStorageKey, value: string): string;
    /**
     * @summary Clears the storage
     * @public
     * @returns {void}
     */
    clear(): void;
    /**
     * @summary Gets the storage
     * @since 0.2.0
     * @returns {SdkStorageSnapshot} The storage snapshot object
     */
    private getSnapshot;
    /**
     * @summary Saves the storage
     * @since 0.2.0
     * @param {SdkStorageSnapshot} storage SdkStorage snapshot object
     */
    private saveSnapshot;
}
