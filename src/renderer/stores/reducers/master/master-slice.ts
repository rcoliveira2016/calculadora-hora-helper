/* eslint-disable react-hooks/rules-of-hooks */
import { useConfiguracaoesParametrosRepository } from '@/service/configuracoes-parametros';
import { useMuiThemeConfigRepository } from '@/service/mui-thema-config';
import { OpcoesMuiThemes } from '@/styles/mui/theme';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initial-state';
import {
  IMasterState,
  IParametrosMasterState,
  ISetarConfiguracaoTemaPayload,
} from './type';

const muiThemeConfigRepository = useMuiThemeConfigRepository();
const { salvar: setarParametros } = useConfiguracaoesParametrosRepository();

const setarMuiThemeConfig = (heDarkMode: boolean, nomeThema: string) => {
  muiThemeConfigRepository.salvar({
    ehModoDark: heDarkMode,
    nomeTheme: nomeThema,
  });
};

export const masterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {
    setarConfiguracaoTema: (
      state: IMasterState,
      action: PayloadAction<ISetarConfiguracaoTemaPayload>
    ) => {
      state.themaAtual.thema = action.payload.acaoCriarThema(
        state.themaAtual.heDarkMode
      );
      state.themaAtual.nomeThema = action.payload.nome;
      setarMuiThemeConfig(state.themaAtual.heDarkMode, action.payload.nome);
    },
    setarDarkMode: (state: IMasterState, action: PayloadAction<boolean>) => {
      state.themaAtual.heDarkMode = action.payload;
      state.themaAtual.thema = OpcoesMuiThemes[state.themaAtual.nomeThema](
        action.payload
      );
      setarMuiThemeConfig(
        state.themaAtual.heDarkMode,
        state.themaAtual.nomeThema
      );
    },
    atualizarParametros: (
      state: IMasterState,
      action: PayloadAction<IParametrosMasterState>
    ) => {
      state.parametros = action.payload;
      setarParametros(state.parametros);
    },
  },
});
