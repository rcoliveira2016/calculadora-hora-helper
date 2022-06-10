import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SyntheticEvent, useEffect, useState } from 'react';
import TemaConfiguracoes from './abas/tema/TemaConfiguracoes';
import ParametrosConfiguracoes from './abas/parametros/ParametrosConfiguracoes';

export default function ConfiguracoesPage() {
  const [abaAtual, setabaAtual] = useState('1');

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setabaAtual(newValue);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const keyNumber = parseInt(event.key);
    if ((event.ctrlKey || event.metaKey) && keyNumber > 0 && keyNumber < 10) {
      event.preventDefault();
      setabaAtual(event.key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={abaAtual}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tema" value="1" />
            <Tab label="Parametros" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TemaConfiguracoes />
        </TabPanel>
        <TabPanel value="2">
          <ParametrosConfiguracoes />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
