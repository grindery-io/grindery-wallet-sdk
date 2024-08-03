export declare enum ClientEventNames {
    /**
     * @summary The event is triggered every time the app page is opened
     */
    appOpened = "appOpened",
    /**
     * @summary The event is triggered when the user wallet is connected
     */
    walletConnected = "walletConnected",
    /**
     * @summary The event is triggered when the user wallet is disconnected
     */
    walletDisconnected = "walletDisconnected",
    /**
     * @summary The event is triggered when the app requests user wallet address
     */
    walletAddressRequested = "walletAddressRequested"
}
export type ClientEventName = keyof typeof ClientEventNames;
