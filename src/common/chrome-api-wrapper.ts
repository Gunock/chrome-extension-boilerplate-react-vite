export enum ChromeMessageType {
    SCRAPER_COMMAND,
    SCRAPING_RESULTS
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
            const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

            const currentTab = tabs[0];
            if (currentTab?.status === 'complete') {
                return currentTab;
            }

            await new Promise(r => setTimeout(r, 50));
        }

        return null;
    }
}
