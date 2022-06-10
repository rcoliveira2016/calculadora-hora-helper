import { useConfiguracaoesParametrosRepository } from '@/service/configuracoes-parametros';
import { initialStateParametro } from '@/stores/reducers/master/initial-state';

export const useObterStateConfiguracoesParametros = () =>
  useConfiguracaoesParametrosRepository().obter() ?? initialStateParametro;
