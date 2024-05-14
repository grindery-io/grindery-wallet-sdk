import { WalletProviderError } from './provider/WalletProviderError';
import {
  ProviderEvents,
  WalletProviderEventEmitter,
} from './provider/WalletProviderEventEmitter';
import {
  GrinderyWalletProvider,
  GrinderyWalletProviderMethodNames,
} from './provider/GrinderyWalletProvider';
import { ProviderStorageKeys } from './provider/WalletProviderLocalStorage';
import { GrinderyRpcMethodNames } from './provider/WalletProvider';

export type ChainId = string;
export type PairingToken = string;
export type ConnectUrl = string;
export type ConnectUrlBrowser = string;
export type ShortToken = string;
export type SessionId = string;
export type Address = string;
export type RequestToken = string;

export interface ProviderConnectInfo {
  readonly chainId: ChainId;
}

export type RequestArgumentsParams = readonly unknown[] | object;

export interface RequestArguments {
  readonly method: GrinderyWalletProviderMethodNames;
  readonly params?: RequestArgumentsParams;
}

export type ProviderMethods = {
  [name in GrinderyRpcProviderRequestMethodName]: {
    sessionRequired?: boolean;
    pairingTokenRequired?: boolean;
    execute: (params?: RequestArgumentsParams) => Promise<unknown>;
  };
};

export interface ProviderMessage {
  type: string;
  data: unknown;
}

export type ProviderStorageKey = keyof typeof ProviderStorageKeys;

export type ProviderStorage = {
  [key in ProviderStorageKeys]?: string;
};

export type GrinderyRpcMethodName = keyof typeof GrinderyRpcMethodNames;

export type GrinderyRpcProviderRequestMethodName =
  keyof typeof GrinderyWalletProviderMethodNames;

export interface ProviderRequestResult {
  requestToken: RequestToken;
}

export type ProviderEvent = keyof typeof ProviderEvents;

export namespace GrinderyRpcProviderRequestResults {
  export type eth_accounts = Address[];
  export type eth_requestAccounts = Address[];
  export type personal_sign = string;
  export type eth_sendTransaction = string;
}

export namespace GrinderyRpcApiRequestResults {
  export type waitForPairingResult = {
    session: {
      expiry: number;
      sessionId: SessionId;
      namespaces: {
        [key: string]: {
          accounts: string[];
          chains: string[];
          events: string[];
          methods: string[];
        };
      };
    };
  };
  export type requestPairing = {
    pairingToken: PairingToken;
    connectUrl: ConnectUrl;
    connectUrlBrowser: ConnectUrlBrowser;
    shortToken: ShortToken;
  };

  export type request = {
    requestToken: RequestToken;
  };

  export type waitForRequestResult =
    | GrinderyRpcProviderRequestResults.eth_accounts
    | GrinderyRpcProviderRequestResults.eth_requestAccounts
    | GrinderyRpcProviderRequestResults.personal_sign
    | GrinderyRpcProviderRequestResults.eth_sendTransaction;

  export type disconnect = boolean;
}

export interface ProviderInterface extends WalletProviderEventEmitter {
  request<T>(args: RequestArguments): Promise<T>;
  on(
    event: ProviderEvents.connect,
    listener: (info: ProviderConnectInfo) => void
  ): this;
  on(
    event: ProviderEvents.disconnect,
    listener: (error: WalletProviderError) => void
  ): this;
  on(
    event: ProviderEvents.chainChanged,
    listener: (chainId: ChainId) => void
  ): this;
  on(
    event: ProviderEvents.accountsChanged,
    listener: (accounts: Address[]) => void
  ): this;
  on(
    event: ProviderEvents.message,
    listener: (message: ProviderMessage) => void
  ): this;
  removeListener(
    event: ProviderEvents.connect,
    listener: (info: ProviderConnectInfo) => void
  ): this;
  removeListener(
    event: ProviderEvents.disconnect,
    listener: (error: WalletProviderError) => void
  ): this;
  removeListener(
    event: ProviderEvents.chainChanged,
    listener: (chainId: ChainId) => void
  ): this;
  removeListener(
    event: ProviderEvents.accountsChanged,
    listener: (accounts: Address[]) => void
  ): this;
  removeListener(
    event: ProviderEvents.message,
    listener: (message: ProviderMessage) => void
  ): this;
}

export interface GrinderyWalletSDKConfig {
  appId: string;
}

/**
 * Represents the assets needed to display a wallet
 *
 * @since 0.1.1
 * @link https://eips.ethereum.org/EIPS/eip-6963#provider-info
 */
export interface EIP6963ProviderInfo {
  uuid: string;
  name: string;

  /**
   * Data URI as defined in RFC-2397.
   *
   * The image SHOULD be a square with 96x96px minimum resolution.
   * The image format is RECOMMENDED to be either lossless or vector based such as PNG, WebP or SVG.
   * @link https://eips.ethereum.org/EIPS/eip-6963#imagesicons
   */
  icon: string;

  /**
   * MUST BE a valid RFC-1034 Domain Name
   * @link https://eips.ethereum.org/EIPS/eip-6963#rdns
   */
  rdns: string;
}

export interface EIP1193Provider extends GrinderyWalletProvider {}

/**
 * Used as a composition interface to announce a Wallet Provider and related metadata.
 *
 * @since 0.1.1
 * @link https://eips.ethereum.org/EIPS/eip-6963#provider-detail
 */
export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider;
}

/**
 * Announce Event dispatched by a Wallet
 *
 * @since 0.1.1
 * @link https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events
 */
export interface EIP6963AnnounceProviderEvent extends CustomEvent {
  type: 'eip6963:announceProvider';
  detail: EIP6963ProviderDetail;
}

/**
 * Request Event dispatched by a DApp
 *
 * @since 0.1.1
 * @link https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events
 */
export interface EIP6963RequestProviderEvent extends Event {
  type: 'eip6963:requestProvider';
}
