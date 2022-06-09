import { darken, lighten, SxProps, Theme } from '@mui/material';

const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

export const TemaGridSubtraido: SxProps<Theme> = {
  '& .super-app-theme--subtraido': {
    bgcolor: (theme) =>
      getBackgroundColor(theme.palette.primary.light, theme.palette.mode),
    '&:hover': {
      bgcolor: (theme) =>
        getHoverBackgroundColor(
          theme.palette.primary.light,
          theme.palette.mode
        ),
    },
  },
};
