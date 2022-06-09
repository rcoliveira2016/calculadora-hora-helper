import { CreateMuiTheme } from '@/styles/mui/theme';
import { ThemeOptions } from '@mui/material';

export interface IMasterState {
  themaAtual: IMasterModelThemaState;
}

export interface IMasterModelThemaState {
  heDarkMode: boolean;
  thema: ThemeOptions;
  nomeThema: string;
}

export type ISetarConfiguracaoTemaPayload = {
  nome: string;
  acaoCriarThema: CreateMuiTheme;
};
