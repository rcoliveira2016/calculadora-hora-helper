import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR } from '@mui/x-data-grid';
import Master from '@/pages/Master/Master';

const theme = createTheme({}, ptBR);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Master />
    </ThemeProvider>
  );
};

export default App;
