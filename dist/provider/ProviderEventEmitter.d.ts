/**
 * @summary A class for emitting provider events
 * @since 0.1.0
 */
export declare class ProviderEventEmitter {
    /**
     * @summary A map of events and their listeners
     */
    private events;
    constructor();
    /**
     * @summary Adds a listener to the provider event
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {ProviderEventEmitter} The instance of the class itself
     */
    on(event: string, callback: Function): this;
    /**
     * @summary Removes a listener from the provider event
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {ProviderEventEmitter} The instance of the class itself
     */
    removeListener(event: string, callback: Function): this;
    /**
     * @summary Emits an event
     * @param {string} event Event name
     * @param data Event data
     * @returns {ProviderEventEmitter} The instance of the class itself
     */
    protected emit(event: string, ...data: any[]): this;
}
