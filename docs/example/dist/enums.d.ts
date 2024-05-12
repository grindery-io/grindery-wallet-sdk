export declare enum ProviderEvents {
    accountsChanged = "accountsChanged",
    pair = "pair",
    connect = "connect",
    disconnect = "disconnect",
    chainChanged = "chainChanged",
    message = "message"
}
export declare enum ProviderStorageKeys {
    pairingToken = "pairingToken",
    sessionId = "sessionId",
    connectUrl = "connectUrl",
    connectUrlBrowser = "connectUrlBrowser",
    shortToken = "shortToken"
}
/**
 * @summary The Grindery RPC API method names
 */
export declare enum GrinderyRpcMethodNames {
    requestPairing = "requestPairing",
    waitForPairingResult = "waitForPairingResult",
    request = "request",
    waitForRequestResult = "waitForRequestResult",
    'disconnect' = "disconnect"
}
/**
 * @summary The Grindery wallet provider method names
 */
export declare enum GrinderyRpcProviderRequestMethodNames {
    eth_requestAccounts = "eth_requestAccounts",
    eth_accounts = "eth_accounts",
    personal_sign = "personal_sign",
    eth_sendTransaction = "eth_sendTransaction",
    gws_disconnect = "gws_disconnect"
}
