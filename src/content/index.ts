import {ChromeMessage, ChromeMessageType} from '../common/chrome-api-wrapper';
import {ScraperCommand, ScraperMessage} from '../common/types/scraper';

async function handleScrapCommand() {
  const pageTitle = document.title;
  const message = new ChromeMessage(ChromeMessageType.SCRAPING_RESULTS, pageTitle);
  await chrome.runtime.sendMessage(chrome.runtime.id, message);
}

console.log('Chrome plugin content script loaded');
chrome.runtime.onMessage.addListener((message: ChromeMessage<ScraperMessage>) => {
  if (message.type === undefined || message.type !== ChromeMessageType.SCRAPER_COMMAND) {
    return false;
  }

  if (message.payload.command === ScraperCommand.SCRAP) {
    handleScrapCommand().catch((error) => console.error(error));
  }

  return false;
});

export {};
