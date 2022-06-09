/* eslint-disable react-hooks/rules-of-hooks */
import { useMuiThemeConfigRepository } from '@/service/mui-thema-config';
import { createMuiThemePadrao, OpcoesMuiThemes } from '@/styles/mui/theme';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMasterState, ISetarConfiguracaoTemaPayload } from './type';

const muiThemeConfigRepository = useMuiThemeConfigRepository();
const config = muiThemeConfigRepository.obter();
const initialState: IMasterState = {
  themaAtual: config
    ? {
        heDarkMode: config.ehModoDark,
        nomeThema: config.nomeTheme,
        thema: OpcoesMuiThemes[config.nomeTheme](config.ehModoDark),
      }
    : {
        heDarkMode: false,
        thema: createMuiThemePadrao(false),
        nomeThema: 'Padrão',
      },
};

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
  },
});
