import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { SettingsProvider } from './context/SettingsContext';
import { router } from './router';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </SettingsProvider>
  </StrictMode>,
);
