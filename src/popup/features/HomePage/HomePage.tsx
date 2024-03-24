import './HomePage.css';

import {Button, Stack} from '@mui/material';
import Box from '@mui/material/Box';
import {ReactElement, useEffect, useState} from 'react';

import {
  ChromeApiWrapper,
  ChromeMessage,
  ChromeMessageType,
  StorageArea
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
    ChromeApiWrapper.getStorageItem<string>(CACHE_KEY, StorageArea.SESSION).then((cachedTitle) => {
      setScrapedPageTitle(cachedTitle ?? '');
    });

    ChromeApiWrapper.setOnRuntimeMessageListener<string>(
      ChromeMessageType.SCRAPING_RESULTS,
      (message) => {
        ChromeApiWrapper.setStorageItem(CACHE_KEY, message.payload, StorageArea.SESSION);
        setScrapedPageTitle(message.payload);
        setDisableScrapButton(false);
        return false;
      }
    );
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
