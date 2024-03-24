export enum ChromeMessageType {
  SCRAPER_COMMAND,
  SCRAPING_RESULTS
}

// https://developer.chrome.com/docs/extensions/reference/api/storage#storage_areas
export enum StorageArea {
  LOCAL = 'local',
  MANAGED = 'managed',
  SESSION = 'session',
  SYNC = 'sync'
}

export class ChromeMessage<T> {
  readonly type: ChromeMessageType;
  readonly payload: T;

  constructor(type: ChromeMessageType, payload: T) {
    this.type = type;
    this.payload = payload;
  }
}

export class ChromeApiWrapper {
  public static async setStorageItem<T>(key: string, value: T, area: StorageArea): Promise<void> {
    const storage = this.getStorageArea(area);

    const items = Object.fromEntries([[key, JSON.stringify(value)]]);
    await storage.set(items);
  }

  public static async getStorageItem<T>(key: string, area: StorageArea): Promise<T | null> {
    const storage = this.getStorageArea(area);
    const items = await storage.get(key);

    const item = items[key];
    if (item === undefined) {
      return null;
    }

    return JSON.parse(item) as T;
  }

  public static async removeStorageItem(key: string, area: StorageArea): Promise<void> {
    const storage = this.getStorageArea(area);
    await storage.remove(key);
  }

  public static sendRuntimeMessage<T>(message: ChromeMessage<T>): Promise<void> {
    return chrome.runtime.sendMessage(chrome.runtime.id, message);
  }

  public static setOnRuntimeMessageListener<T>(
    type: ChromeMessageType,
    callback: (message: ChromeMessage<T>) => boolean
  ): void {
    chrome.runtime.onMessage.addListener((message: ChromeMessage<T>) => {
      if (message.type === undefined || message.type !== type) {
        return false;
      }
      return callback(message);
    });
  }

  public static async sendTabMessage<T>(message: ChromeMessage<T>): Promise<void> {
    const currentTab = await this.getCurrentTab();
    if (currentTab == null) {
      throw new Error('Could not find current tab');
    }

    await chrome.tabs.sendMessage(currentTab.id ?? 0, message);
  }

  public static async getCurrentTab(): Promise<chrome.tabs.Tab | null> {
    const dateStarted = Date.now();

    // Prevents code from failing when used too soon
    while (Date.now() - dateStarted < 5000) {
      const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true});

      const currentTab = tabs[0];
      if (currentTab?.status === 'complete') {
        return currentTab;
      }

      await new Promise((r) => setTimeout(r, 50));
    }

    return null;
  }

  private static getStorageArea(area: StorageArea): chrome.storage.StorageArea {
    switch (area) {
      case StorageArea.LOCAL:
        return chrome.storage.local;
      case StorageArea.MANAGED:
        return chrome.storage.managed;
      case StorageArea.SESSION:
        return chrome.storage.session;
      case StorageArea.SYNC:
        return chrome.storage.sync;
      default:
        throw new Error(`Unknown storage area: ${area}`);
    }
  }
}
