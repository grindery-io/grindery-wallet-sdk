export class ProviderEventEmitter {
  private events: Map<string, Array<Function>>;

  constructor() {
    this.events = new Map();
  }

  on(event: string, callback: Function) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
    return this;
  }

  removeListener(event: string, callback: Function) {
    if (this.events.has(event)) {
      const callbacks = this.events.get(event)!.filter(cb => cb !== callback);
      this.events.set(event, callbacks);
    }
    return this;
  }

  protected emit(event: string, ...data: any[]) {
    if (this.events.has(event)) {
      console.log('[GrinderyWalletProvider] > Event:', event, data);
      this.events.get(event)!.forEach(callback => {
        callback(...data);
      });
    }
    return this;
  }
}
