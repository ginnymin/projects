interface LocalStorageType<T> {
  get<K extends keyof T>(key: K): T[K] | null;
  set<K extends keyof T>(key: K, value: T[K]): void;
  remove<K extends keyof T>(key: K): void;
  clear(): void;
}

export class LocalStorage<T> implements LocalStorageType<T> {
  constructor(private readonly storage: Storage | undefined) {}

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.storage?.setItem(key.toString(), JSON.stringify(value));
  }

  get<K extends keyof T>(key: K): T[K] | null {
    const value = this.storage?.getItem(key.toString());

    if (
      value === null ||
      value === 'null' ||
      value === undefined ||
      value === 'undefined'
    ) {
      return null;
    }

    return JSON.parse(value) as T[K];
  }

  remove<K extends keyof T>(key: K): void {
    this.storage?.removeItem(key.toString());
  }

  clear(): void {
    this.storage?.clear();
  }
}
