export declare class ProviderEventEmitter {
    private events;
    constructor();
    on(event: string, callback: Function): this;
    removeListener(event: string, callback: Function): this;
    protected emit(event: string, ...data: any[]): this;
}
