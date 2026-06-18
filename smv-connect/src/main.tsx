import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/600.css';
import '@fontsource/source-sans-pro/700.css';
import 'leaflet/dist/leaflet.css';
import './index.css';

import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { router } from './router';

const racine = document.getElementById('root');
if (!racine) throw new Error('Élément #root introuvable');

createRoot(racine).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
);
