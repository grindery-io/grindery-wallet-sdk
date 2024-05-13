import { WalletProviderError } from './provider/WalletProviderError';
import { ProviderEvents, WalletProviderEventEmitter } from './provider/WalletProviderEventEmitter';
import { GrinderyWalletProviderMethodNames } from './provider/GrinderyWalletProvider';
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
export type GrinderyRpcProviderRequestMethodName = keyof typeof GrinderyWalletProviderMethodNames;
export interface ProviderRequestResult {
    requestToken: RequestToken;
}
export type ProviderEvent = keyof typeof ProviderEvents;
export declare namespace GrinderyRpcProviderRequestResults {
    type eth_accounts = Address[];
    type eth_requestAccounts = Address[];
    type personal_sign = string;
    type eth_sendTransaction = string;
}
export declare namespace GrinderyRpcApiRequestResults {
    type waitForPairingResult = {
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
    type requestPairing = {
        pairingToken: PairingToken;
        connectUrl: ConnectUrl;
        connectUrlBrowser: ConnectUrlBrowser;
        shortToken: ShortToken;
    };
    type request = {
        requestToken: RequestToken;
    };
    type waitForRequestResult = GrinderyRpcProviderRequestResults.eth_accounts | GrinderyRpcProviderRequestResults.eth_requestAccounts | GrinderyRpcProviderRequestResults.personal_sign | GrinderyRpcProviderRequestResults.eth_sendTransaction;
    type disconnect = boolean;
}
export interface ProviderInterface extends WalletProviderEventEmitter {
    request<T>(args: RequestArguments): Promise<T>;
    on(event: ProviderEvents.connect, listener: (info: ProviderConnectInfo) => void): this;
    on(event: ProviderEvents.disconnect, listener: (error: WalletProviderError) => void): this;
    on(event: ProviderEvents.chainChanged, listener: (chainId: ChainId) => void): this;
    on(event: ProviderEvents.accountsChanged, listener: (accounts: Address[]) => void): this;
    on(event: ProviderEvents.message, listener: (message: ProviderMessage) => void): this;
    removeListener(event: ProviderEvents.connect, listener: (info: ProviderConnectInfo) => void): this;
    removeListener(event: ProviderEvents.disconnect, listener: (error: WalletProviderError) => void): this;
    removeListener(event: ProviderEvents.chainChanged, listener: (chainId: ChainId) => void): this;
    removeListener(event: ProviderEvents.accountsChanged, listener: (accounts: Address[]) => void): this;
    removeListener(event: ProviderEvents.message, listener: (message: ProviderMessage) => void): this;
}
export interface GrinderyWalletSDKConfig {
    appId: string;
}
