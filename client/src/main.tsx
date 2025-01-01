import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ToastProvider } from './providers/ToastProvider/ToastProvider.tsx';
import ReactQueryProvider from './providers/ReactQueryProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ReactQueryProvider>
  </StrictMode>
);
