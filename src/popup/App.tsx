import { lazy, Suspense } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import AppShell from './AppShell/AppShell';
import PopupHeader from './components/PopupHeader/PopupHeader';

const HomePage = lazy(() => import('./features/HomePage/HomePage'));

export default function App() {
    return (
        <MemoryRouter>
            <AppShell>
                <Suspense fallback={<PopupHeader />}>
                    <Routes>
                        <Route path="/" element={<PopupHeader />} />
                        <Route path="/home-page" element={<HomePage />} />
                    </Routes>
                </Suspense>
            </AppShell>
        </MemoryRouter>
    );
}
