chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.clear();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // TODO: Here you can add logic such as e.g. disable popup button on specific pages
    console.debug('tabId', tabId, 'changeInfo', changeInfo, 'tab', tab);
});

export {};
