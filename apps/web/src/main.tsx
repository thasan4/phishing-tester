import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { SnackbarProvider } from 'notistack';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </StrictMode>,
);