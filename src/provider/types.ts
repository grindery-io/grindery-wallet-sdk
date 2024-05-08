import { ProviderError } from './ProviderError';
import { ProviderEventEmitter } from './ProviderEventEmitter';

export interface ProviderConnectInfo {
  readonly chainId: string;
}

export type RequestArgumentsParams = readonly unknown[] | object;

export type ProviderMethodEthRequestAccountsParams = {
  userId?: string;
} & RequestArgumentsParams;

export interface RequestArguments {
  readonly method: string;
  readonly params?: RequestArgumentsParams;
}

export interface ProviderMethods {
  [name: string]: {
    sessionRequired?: boolean;
    pairingTokenRequired?: boolean;
    execute: (params?: RequestArgumentsParams) => Promise<unknown>;
  };
}

export interface ProviderMessage {
  type: string;
  data: unknown;
}

export interface AppData {
  uri: string;
  name?: string;
  icon?: string;
}

export interface AppUser {
  id: string;
}

export interface ProviderInterface extends ProviderEventEmitter {
  request<T>(args: RequestArguments): Promise<T>;
  on(event: 'connect', listener: (info: ProviderConnectInfo) => void): this;
  on(event: 'disconnect', listener: (error: ProviderError) => void): this;
  on(event: 'chainChanged', listener: (chainId: string) => void): this;
  on(event: 'accountsChanged', listener: (accounts: string[]) => void): this;
  on(event: 'message', listener: (message: ProviderMessage) => void): this;
  removeListener(
    event: 'connect',
    listener: (info: ProviderConnectInfo) => void
  ): this;
  removeListener(
    event: 'disconnect',
    listener: (error: ProviderError) => void
  ): this;
  removeListener(
    event: 'chainChanged',
    listener: (chainId: string) => void
  ): this;
  removeListener(
    event: 'accountsChanged',
    listener: (accounts: string[]) => void
  ): this;
  removeListener(
    event: 'message',
    listener: (message: ProviderMessage) => void
  ): this;
}

export type ProviderStorageKey =
  | 'pairingToken'
  | 'sessionId'
  | 'address'
  | 'connectUrl'
  | 'connectUrlBrowser';

export type ProviderStorage = {
  [key in ProviderStorageKey]?: string;
};

export interface ProviderRequestPairingResult {
  pairingToken: string;
  connectUrl: string;
  connectUrlBrowser: string;
}

export type GrinderyRpcMethodName =
  | 'checkout_requestPairing'
  | 'checkout_waitForPairingResult'
  | 'checkout_request';

export interface ProviderPairingResult {
  sessionId: string;
  address: string;
}
