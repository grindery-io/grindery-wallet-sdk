import { WalletProviderError } from './provider/WalletProviderError';
import { WalletProviderEventEmitter } from './provider/WalletProviderEventEmitter';
import { GrinderyRpcMethodNames, GrinderyRpcProviderRequestMethodNames, ProviderEvents, ProviderStorageKeys } from './enums';
export declare type ChainId = string;
export declare type PairingToken = string;
export declare type ConnectUrl = string;
export declare type ConnectUrlBrowser = string;
export declare type ShortToken = string;
export declare type SessionId = string;
export declare type Address = string;
export declare type RequestToken = string;
export interface ProviderConnectInfo {
    readonly chainId: ChainId;
}
export declare type RequestArgumentsParams = readonly unknown[] | object;
export interface RequestArguments {
    readonly method: GrinderyRpcProviderRequestMethodNames;
    readonly params?: RequestArgumentsParams;
}
export declare type ProviderMethods = {
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
export declare type ProviderStorageKey = keyof typeof ProviderStorageKeys;
export declare type ProviderStorage = {
    [key in ProviderStorageKeys]?: string;
};
export interface ProviderRequestPairingResult {
    pairingToken: PairingToken;
    connectUrl: ConnectUrl;
    connectUrlBrowser: ConnectUrlBrowser;
    shortToken: ShortToken;
}
export declare type GrinderyRpcMethodName = keyof typeof GrinderyRpcMethodNames;
export interface ProviderPairingResult {
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
}
export declare type GrinderyRpcProviderRequestMethodName = keyof typeof GrinderyRpcProviderRequestMethodNames;
export interface ProviderRequestResult {
    requestToken: RequestToken;
}
export declare type ProviderEvent = keyof typeof ProviderEvents;
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
