import { ChromeMessage, ChromeMessageType } from '../common/chrome-api-wrapper';
import { ScraperCommand, ScraperMessage } from '../common/types/scraper';

async function handleScrapeCommand() {
    const pageTitle = document.title;
    const message = new ChromeMessage(ChromeMessageType.SCRAPING_RESULTS, pageTitle);
    await chrome.runtime.sendMessage(chrome.runtime.id, message);
}

chrome.runtime.onMessage.addListener((message: ChromeMessage<ScraperMessage>) => {
    console.debug('Received message', message);
    if (message.type !== ChromeMessageType.SCRAPER_COMMAND) {
        return false;
    }

    if (message.payload.command === ScraperCommand.SCRAPE) {
        handleScrapeCommand().catch(error => console.error(error));
    }

    return false;
});

console.debug('Chrome plugin content script loaded');

export {};
