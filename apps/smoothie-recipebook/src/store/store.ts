// global db variables
let db: IDBDatabase;
let version = 1;
const dbName = 'db';

// store names
export enum StoreNames {
  Recipes = 'recipes',
}

const getObjectStore = (
  storeName: StoreNames,
  mode: 'readonly' | 'readwrite'
) => {
  const tx = db.transaction(storeName, mode);
  const store = tx.objectStore(storeName);
  return { tx, store };
};

export const init = <T>(storeName: StoreNames, keyPath: keyof T) => {
  return new Promise<boolean>((resolve) => {
    // open the connection
    const request = indexedDB.open(dbName);

    request.onupgradeneeded = () => {
      db = request.result;

      // create store if store doesn't exist
      if (!db.objectStoreNames.contains(storeName)) {
        console.log('creating users store: ', storeName);
        db.createObjectStore(storeName, {
          keyPath: keyPath as string,
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      resolve(true);
    };

    request.onerror = () => {
      console.log('store init() onerror', version);
      resolve(false);
    };
  });
};

export function get<T>(storeName: StoreNames, key: number): Promise<T>;
export function get<T>(storeName: StoreNames): Promise<T[]>;

export function get<T>(storeName: StoreNames, key?: number) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onsuccess = () => {
      db = request.result;

      const { tx, store } = getObjectStore(storeName, 'readonly');

      const res = key === undefined ? store.getAll() : store.get(key);

      res.onsuccess = () => {
        resolve(res.result as T | T[]);
      };

      res.onerror = () => {
        console.log('store get() onerror');
        const error = res.error?.message;
        if (error) {
          reject(new Error(error));
        } else {
          reject(new Error('unknown error'));
        }
      };

      tx.oncomplete = () => db.close();
    };
  });
}

export const add = <T>(
  storeName: StoreNames,
  data: T
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName, version);

    request.onsuccess = () => {
      db = request.result;
      const { store } = getObjectStore(storeName, 'readwrite');
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      console.log('store add() onerror', data);
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve('unknown error');
      }
    };
  });
};

export const update = <T>(storeName: StoreNames, key: number, payload: T) => {
  return new Promise<T>((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onsuccess = () => {
      db = request.result;

      const { tx, store } = getObjectStore(storeName, 'readwrite');

      const res = store.get(key);

      res.onsuccess = () => {
        const updateRes = store.put(payload);
        updateRes.onsuccess = () => {
          resolve(res.result as T);
        };
      };

      res.onerror = () => {
        console.log('store update() onerror');
        const error = res.error?.message;
        if (error) {
          reject(new Error(error));
        } else {
          reject(new Error('unknown error'));
        }
      };

      tx.oncomplete = () => db.close();
    };
  });
};

export const remove = (storeName: StoreNames, key: number) => {
  return new Promise<boolean>((resolve) => {
    // again open the connection
    const request = indexedDB.open(dbName, version);

    request.onsuccess = () => {
      db = request.result;
      const { store } = getObjectStore(storeName, 'readwrite');
      const res = store.delete(key);

      res.onsuccess = () => {
        resolve(true);
      };

      res.onerror = () => {
        resolve(false);
      };
    };
  });
};
