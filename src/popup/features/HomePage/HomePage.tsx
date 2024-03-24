import './HomePage.css';

import {Button, Stack} from '@mui/material';
import Box from '@mui/material/Box';
import {ReactElement, useEffect, useState} from 'react';

import {
  ChromeApiWrapper,
  ChromeMessage,
  ChromeMessageType
} from '../../../common/chrome-api-wrapper';
import {ScraperCommand, ScraperMessage} from '../../../common/types/scraper';
import PopupContent from '../../components/PopupContent/PopupContent';
import PopupHeader from '../../components/PopupHeader/PopupHeader';

const CACHE_KEY = 'scrapedPageTitle';

export default function HomePage(): ReactElement {
  const [scrapedPageTitle, setScrapedPageTitle] = useState<string>('');
  const [disableScrapButton, setDisableScrapButton] = useState<boolean>(false);

  async function scrap() {
    setDisableScrapButton(true);

    const message: ChromeMessage<ScraperMessage> = {
      type: ChromeMessageType.SCRAPER_COMMAND,
      payload: {command: ScraperCommand.SCRAP}
    };
    await ChromeApiWrapper.sendTabMessage(message);
  }

  useEffect(() => {
    chrome.storage.session.get(CACHE_KEY).then((items) => {
      const cachedTitle = items[CACHE_KEY];
      setScrapedPageTitle(cachedTitle ?? '');
    });

    chrome.runtime.onMessage.addListener((message: ChromeMessage<string>) => {
      if (message.type !== ChromeMessageType.SCRAPING_RESULTS) {
        return false;
      }

      chrome.storage.session.set({[CACHE_KEY]: message.payload});
      setScrapedPageTitle(message.payload);
      setDisableScrapButton(false);
      return false;
    });
  }, []);

  return (
    <>
      <PopupHeader />
      <PopupContent>
        <Stack alignItems='center' spacing={1}>
          <Box alignItems='center'>
            <h1>My Chromium extension</h1>
          </Box>

          <h1>Scraped title: {scrapedPageTitle}</h1>

          <Button
            className='scrap-button'
            variant='contained'
            disabled={disableScrapButton}
            onClick={scrap}
          >
            Scrape page title
          </Button>
        </Stack>
      </PopupContent>
    </>
  );
}
