import {
  EventEmitter,
  ProviderEventName,
} from '../../src/classes/EventEmitter';

describe('EventEmitter', () => {
  let eventEmitter: EventEmitter;

  beforeEach(() => {
    eventEmitter = new EventEmitter();
  });

  it('should add a listener to the event', () => {
    const event: ProviderEventName = 'accountsChanged';
    const callback = jest.fn();

    eventEmitter.on(event, callback);

    expect(eventEmitter['events'].get(event)).toContain(callback);
  });

  it('should remove a listener from the event', () => {
    const event: ProviderEventName = 'accountsChanged';
    const callback = jest.fn();

    eventEmitter.on(event, callback);
    eventEmitter.removeListener(event, callback);

    expect(eventEmitter['events'].get(event)).not.toContain(callback);
  });

  it('should emit an event and call the associated callbacks', () => {
    const event: ProviderEventName = 'accountsChanged';
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const data = { foo: 'bar' };

    class ExtendedEventEmitter extends EventEmitter {
      public emitEvent(event: ProviderEventName, ...data: any[]): void {
        this.emit(event, ...data);
      }
    }

    const emitter = new ExtendedEventEmitter();

    emitter.on(event, callback1);
    emitter.on(event, callback2);
    emitter.emitEvent(event, data);

    expect(callback1).toHaveBeenCalledWith(data);
    expect(callback2).toHaveBeenCalledWith(data);
  });
});
