import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '@/App';
import PrincipalPage from '@/pages/Principal/Principal';
import './styles/index.css';
import { Provider } from 'react-redux';
import { store } from './stores/store';

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/index.html" element={<App />}>
            <Route index element={<PrincipalPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
