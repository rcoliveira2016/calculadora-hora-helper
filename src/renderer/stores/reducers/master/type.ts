import { CreateMuiTheme } from '@/styles/mui/theme';
import { ThemeOptions } from '@mui/material';

export interface IMasterState {
  themaAtual: IMasterModelThemaState;
  parametros: IParametrosMasterState;
}

export interface IMasterModelThemaState {
  heDarkMode: boolean;
  thema: ThemeOptions;
  nomeThema: string;
}

export interface IParametrosMasterState {
  minutosParaSubtrairAlmoco: number;
  subtrairAlmoco: boolean;
}

export type ISetarConfiguracaoTemaPayload = {
  nome: string;
  acaoCriarThema: CreateMuiTheme;
};
