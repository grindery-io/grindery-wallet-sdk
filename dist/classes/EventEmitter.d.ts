import { ProviderEvent } from '../types';
/**
 * @summary A class for emitting provider events
 * @since 0.1.0
 */
export declare class EventEmitter {
    /**
     * @summary A map of events and their listeners
     * @public
     */
    events: Map<ProviderEvent, Array<Function>>;
    constructor();
    /**
     * @summary Adds a listener to the event
     * @public
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {EventEmitter} The instance of the class itself
     */
    on(event: ProviderEvent, callback: Function): this;
    /**
     * @summary Removes a listener from the event
     * @public
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {EventEmitter} The instance of the class itself
     */
    removeListener(event: ProviderEvent, callback: Function): this;
    /**
     * @summary Emits an event
     * @public
     * @param {string} event Event name
     * @param data Event data
     * @returns {EventEmitter} The instance of the class itself
     */
    protected emit(event: ProviderEvent, ...data: any[]): this;
}
