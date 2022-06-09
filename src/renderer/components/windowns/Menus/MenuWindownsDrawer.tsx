import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import TrocarModoDark from './TrocarModoDark';

export default function MenuWindownsDrawer(props: {
  abrir: boolean;
  setAbrir: (valor: boolean) => void;
}) {
  const { abrir, setAbrir } = props;
  const navigate = useNavigate();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setAbrir(false);
  };

  function abrirTela(
    rota: string
  ): React.MouseEventHandler<HTMLDivElement> | undefined {
    return () => {
      navigate(rota, { replace: true });
      setAbrir(false);
    };
  }

  return (
    <Drawer anchor={'left'} open={abrir} onClose={toggleDrawer}>
      <Box sx={{ width: 250 }} role="presentation" onKeyDown={toggleDrawer}>
        <Box sx={{ py: 1 }}>
          <TrocarModoDark />
        </Box>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={abrirTela('/')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Principal'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={abrirTela('/configuracoes')}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={'Configuração'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
