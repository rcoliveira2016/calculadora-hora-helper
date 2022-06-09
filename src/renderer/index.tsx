import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '@/App';
import PrincipalPage from '@/pages/Principal/Principal';
import './styles/index.css';
import { Provider } from 'react-redux';
import ConfiguracoesPage from '@/pages/Configuracoes/Configuracoes';
import { store } from './stores/store';

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <StrictMode>
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<PrincipalPage />} />
            <Route path="configuracoes" element={<ConfiguracoesPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  </StrictMode>
);
