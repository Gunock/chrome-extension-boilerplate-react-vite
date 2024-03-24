import './HomePage.css';

import {Alert, Button, Snackbar, Stack} from '@mui/material';
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
  const [disableScrapeButton, setDisableScrapeButton] = useState<boolean>(false);

  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');

  function handleSnackbarClose() {
    setShowErrorSnackbar(false);
  }

  async function scrape() {
    setDisableScrapeButton(true);

    const message: ChromeMessage<ScraperMessage> = {
      type: ChromeMessageType.SCRAPER_COMMAND,
      payload: {command: ScraperCommand.SCRAPE}
    };

    try {
      await ChromeApiWrapper.sendTabMessage(message);
    } catch (e) {
      console.error(e);
      setErrorSnackbarMessage('Failed to scrape page title. Please check console logs.');
      setShowErrorSnackbar(true);
      setDisableScrapeButton(false);
    }
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
      setDisableScrapeButton(false);
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

          <p>
            <strong>Scraped title:</strong> {scrapedPageTitle}
          </p>

          <Button
            className='scrape-button'
            variant='contained'
            disabled={disableScrapeButton}
            onClick={scrape}
          >
            Scrape page title
          </Button>
        </Stack>
      </PopupContent>
      <Snackbar open={showErrorSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert className='alert-snackbar-alert' severity='error' onClose={handleSnackbarClose}>
          {errorSnackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
