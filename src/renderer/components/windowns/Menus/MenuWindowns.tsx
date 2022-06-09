import { Button, Grid, IconButton, styled } from '@mui/material';
import { red, yellow } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import MenuWindownsDrawer from './MenuWindownsDrawer';

const styleButton: React.CSSProperties = {
  borderRadius: '50%',
  width: '1.15rem',
  height: '1.15rem',
  minWidth: '0',
  padding: '0.5rem',
  margin: '0.5rem 0',
  marginLeft: '0.5rem',
};
const ButtonRoundRed = styled(Button)({
  ...styleButton,
  marginRight: '0.4rem',
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
    transform: 'scale(0.9)',
    transition: 'all 0.2s ease-out',
  },
});

const ButtonRoundYellow = styled(Button)({
  ...styleButton,
  backgroundColor: yellow[500],
  '&:hover': {
    backgroundColor: yellow[700],
    transform: 'scale(0.9)',
    transition: 'all 0.2s ease-out',
  },
});

export function MenuWindowns() {
  const [abrirMenu, setAbrirMenu] = useState(false);

  function closeWindow() {
    const { ipcRenderer } = window.electron;
    ipcRenderer.sendMessage('closedApp', []);
  }

  function minimizeWindow() {
    const { ipcRenderer } = window.electron;
    ipcRenderer.sendMessage('minimizeApp', []);
  }

  return (
    <>
      <Grid
        container
        className="drag-app-region"
        style={{ background: '#403f3f' }}
        justifyContent={'space-between'}
      >
        <Grid item>
          <IconButton
            sx={{ ml: 2 }}
            size="medium"
            edge="start"
            aria-label="menu"
            onClick={() => setAbrirMenu(true)}
          >
            <MenuIcon htmlColor="#fff" />
          </IconButton>
        </Grid>
        <Grid item>
          <ButtonRoundYellow onClick={minimizeWindow} />
          <ButtonRoundRed onClick={closeWindow} />
        </Grid>
      </Grid>
      <MenuWindownsDrawer abrir={abrirMenu} setAbrir={setAbrirMenu} />
    </>
  );
}
