export enum ProviderEvents {
  accountsChanged = 'accountsChanged',
  pair = 'pair',
  connect = 'connect',
  disconnect = 'disconnect',
  chainChanged = 'chainChanged',
  message = 'message',
}

export enum ProviderStorageKeys {
  pairingToken = 'pairingToken',
  sessionId = 'sessionId',
  connectUrl = 'connectUrl',
  connectUrlBrowser = 'connectUrlBrowser',
  shortToken = 'shortToken',
}

export enum GrinderyRpcMethodNames {
  checkout_requestPairing = 'checkout_requestPairing',
  checkout_waitForPairingResult = 'checkout_waitForPairingResult',
  checkout_request = 'checkout_request',
  checkout_waitForRequestResult = 'checkout_waitForRequestResult',
}

export enum GrinderyRpcProviderRequestMethodNames {
  eth_requestAccounts = 'eth_requestAccounts',
  eth_accounts = 'eth_accounts',
  personal_sign = 'personal_sign',
  eth_sendTransaction = 'eth_sendTransaction',
}
