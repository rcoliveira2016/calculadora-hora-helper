import AppBar from '@mui/material/AppBar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MenuWindowns } from '@/components/windowns/Menus/MenuWindowns';
import { Outlet } from 'react-router-dom';

export default function Master() {
  console.log('Master');
  return (
    <div>
      <MenuWindowns />
      <AppBar position="relative">
        <Toolbar>
          <AccessTimeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Horas Helper
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 3,
          }}
        >
          <Container fixed disableGutters>
            <Outlet />
          </Container>
        </Box>
      </main>
    </div>
  );
}
