import { ProviderEventEmitter } from './ProviderEventEmitter';
import { ProviderStorageKey } from './types';
export declare class ProviderLocalStorage extends ProviderEventEmitter {
    protected getStorageValue(key: ProviderStorageKey): string;
    protected setStorageValue(key: ProviderStorageKey, value: string): void;
    private getStorage;
    private saveStorage;
}
