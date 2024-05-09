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
export declare enum GrinderyRpcMethodNames {
    checkout_requestPairing = "checkout_requestPairing",
    checkout_waitForPairingResult = "checkout_waitForPairingResult",
    checkout_request = "checkout_request",
    checkout_waitForRequestResult = "checkout_waitForRequestResult"
}
export declare enum GrinderyRpcProviderRequestMethodNames {
    eth_requestAccounts = "eth_requestAccounts",
    eth_accounts = "eth_accounts",
    personal_sign = "personal_sign",
    eth_sendTransaction = "eth_sendTransaction"
}
