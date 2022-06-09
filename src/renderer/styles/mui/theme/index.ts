import { ThemeOptions } from '@mui/material';
import {
  blueGrey,
  deepOrange,
  green,
  indigo,
  orange,
  purple,
  red,
} from '@mui/material/colors';

export type CreateMuiTheme = (ehDarkMode: boolean) => ThemeOptions;

export type MuiThemesOptions = Record<string, CreateMuiTheme>;

export const createMuiThemePadrao: CreateMuiTheme = (ehDarkMode: boolean) => {
  return {
    palette: {
      mode: ehDarkMode ? 'dark' : 'light',
      primary: indigo,
      secondary: green,
    },
  };
};

export const createMuiThemeVariante1: CreateMuiTheme = (
  ehDarkMode: boolean
) => {
  return {
    palette: {
      mode: ehDarkMode ? 'dark' : 'light',
      primary: purple,
      secondary: orange,
    },
  };
};

export const createMuiThemeVariante2: CreateMuiTheme = (
  ehDarkMode: boolean
) => {
  return {
    palette: {
      mode: ehDarkMode ? 'dark' : 'light',
      primary: deepOrange,
      secondary: orange,
    },
  };
};

export const createMuiThemeVariante3: CreateMuiTheme = (
  ehDarkMode: boolean
) => {
  return {
    palette: {
      mode: ehDarkMode ? 'dark' : 'light',
      primary: red,
      secondary: deepOrange,
    },
  };
};

export const createMuiThemeVariante4: CreateMuiTheme = (
  ehDarkMode: boolean
) => {
  return {
    palette: {
      mode: ehDarkMode ? 'dark' : 'light',
      primary: blueGrey,
      secondary: orange,
    },
  };
};

export const OpcoesMuiThemes: MuiThemesOptions = {
  Padrão: createMuiThemePadrao,
  Variante1: createMuiThemeVariante1,
  Variante2: createMuiThemeVariante2,
  Variante3: createMuiThemeVariante3,
  Variante4: createMuiThemeVariante4,
};

export const useListaOpcoesMuiThemes = (): string[] => {
  return Object.keys(OpcoesMuiThemes);
};
