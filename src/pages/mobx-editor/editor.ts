
export class Editor {
  /**
   * Ioc Container
   */
  private context = new Map<KeyType, any>();

  get<T = undefined, KeyOrType = any>(keyOrType: KeyOrType): any {
    return this.context.get(keyOrType as any);
  }

  has(keyOrType: KeyType): boolean {
    return this.context.has(keyOrType);
  }

  set(key: KeyType, data: any): void | Promise<void> {
    this.context.set(key, data)
  }

  setConfig(config: { [key: string]: any }) {
    if (config) {
      Object.keys(config).forEach((key) => {
        this.set(key, config[key]);
      });
    }
  }
}
