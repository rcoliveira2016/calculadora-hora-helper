import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR } from '@mui/x-data-grid';
import Master from '@/pages/Master/Master';
import { useAppSelector } from '@/stores/hooks';
import { useMemo } from 'react';

const App = () => {
  const { thema: themaConfig } = useAppSelector(
    (state) => state.masterReducer.themaAtual
  );
  const thema = useMemo(() => createTheme(themaConfig, ptBR), [themaConfig]);

  return (
    <ThemeProvider theme={thema}>
      <CssBaseline />
      <Master />
    </ThemeProvider>
  );
};

export default App;
