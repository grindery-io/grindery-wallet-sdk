import { ProviderEvent } from '../types';

export enum ProviderEvents {
  accountsChanged = 'accountsChanged',
  pair = 'pair',
  connect = 'connect',
  disconnect = 'disconnect',
  chainChanged = 'chainChanged',
  message = 'message',
}

/**
 * @summary A class for emitting provider events
 * @since 0.1.0
 */
export class WalletProviderEventEmitter {
  /**
   * @summary A map of events and their listeners
   * @public
   */
  public events: Map<ProviderEvent, Array<Function>>;

  constructor() {
    this.events = new Map();
  }

  /**
   * @summary Adds a listener to the event
   * @public
   * @param {string} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */
  public on(event: ProviderEvent, callback: Function) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
    return this;
  }

  /**
   * @summary Removes a listener from the event
   * @public
   * @param {string} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */
  public removeListener(event: ProviderEvent, callback: Function) {
    if (this.events.has(event)) {
      const callbacks = this.events.get(event)!.filter((cb) => cb !== callback);
      this.events.set(event, callbacks);
    }
    return this;
  }

  /**
   * @summary Emits an event
   * @public
   * @param {string} event Event name
   * @param data Event data
   * @returns {EventEmitter} The instance of the class itself
   */
  protected emit(event: ProviderEvent, ...data: any[]) {
    if (this.events.has(event)) {
      console.log('[Grindery.WalletSDK] > Event:', event, data[0]);
      this.events.get(event)!.forEach((callback) => {
        callback(...data);
      });
    }
    return this;
  }
}
