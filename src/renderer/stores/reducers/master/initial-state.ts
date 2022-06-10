/* eslint-disable react-hooks/rules-of-hooks */
import { useConfiguracaoesParametrosRepository } from '@/service/configuracoes-parametros';
import { useMuiThemeConfigRepository } from '@/service/mui-thema-config';
import { createMuiThemePadrao, OpcoesMuiThemes } from '@/styles/mui/theme';
import { IMasterState, IParametrosMasterState } from './type';

const muiThemeConfigRepository = useMuiThemeConfigRepository();
const configuracaoesParametrosRepository =
  useConfiguracaoesParametrosRepository();

const configThema = muiThemeConfigRepository.obter();
const configParametro = configuracaoesParametrosRepository.obter();
const initialStateParametro: IParametrosMasterState = {
  minutosParaSubtrairAlmoco: 20,
  subtrairAlmoco: true,
};

const initialState: IMasterState = {
  themaAtual: configThema
    ? {
        heDarkMode: configThema.ehModoDark,
        nomeThema: configThema.nomeTheme,
        thema: OpcoesMuiThemes[configThema.nomeTheme](configThema.ehModoDark),
      }
    : {
        heDarkMode: false,
        thema: createMuiThemePadrao(false),
        nomeThema: 'Padrão',
      },
  parametros: configParametro || initialStateParametro,
};

export { initialState, initialStateParametro };
