/**
 * @summary Provider events
 * @since 0.2.0
 * @link https://eips.ethereum.org/EIPS/eip-1193#provider-events
 * @enum {string}
 */
export declare enum ProviderEvents {
    accountsChanged = "accountsChanged",
    pair = "pair",
    connect = "connect",
    disconnect = "disconnect",
    chainChanged = "chainChanged",
    message = "message"
}
/**
 * @summary Provider event name
 * @since 0.2.0
 */
export type ProviderEventName = keyof typeof ProviderEvents;
/**
 * @summary A class for emitting provider events
 * @since 0.2.0
 */
export declare class EventEmitter {
    constructor();
    /**
     * @summary A map of events and their listeners
     * @private
     */
    private events;
    /**
     * @summary Adds a listener to the event
     * @public
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {EventEmitter} The instance of the class itself
     */
    on(event: ProviderEventName, callback: Function): this;
    /**
     * @summary Removes a listener from the event
     * @public
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {EventEmitter} The instance of the class itself
     */
    removeListener(event: ProviderEventName, callback: Function): this;
    /**
     * @summary Emits an event
     * @public
     * @param {string} event Event name
     * @param data Event data
     * @returns {EventEmitter} The instance of the class itself
     */
    protected emit(event: ProviderEventName, ...data: any[]): this;
}
