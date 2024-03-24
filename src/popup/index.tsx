import {lazy, ReactElement, StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {MemoryRouter, Route, Routes} from 'react-router-dom';

import AppShell from './AppShell/AppShell';
import PopupHeader from './components/PopupHeader/PopupHeader';

const HomePage = lazy(() => import('./features/HomePage/HomePage'));

function Index(): ReactElement {
  return (
    <StrictMode>
      <MemoryRouter>
        <AppShell>
          <Suspense fallback={<PopupHeader />}>
            <Routes>
              <Route path='/' element={<PopupHeader />} />
              <Route path='/home-page' element={<HomePage />} />
            </Routes>
          </Suspense>
        </AppShell>
      </MemoryRouter>
    </StrictMode>
  );
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<Index />);
