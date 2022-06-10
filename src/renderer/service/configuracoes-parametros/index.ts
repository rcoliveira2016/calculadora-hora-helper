/* eslint-disable react-hooks/rules-of-hooks */
import {
  useSetItemLocalStorage,
  useGetItemLocalStorage,
} from '@/helpers/common/loacal-storage/loacal-storage';
import { IParametrosModelSerice } from './type';

const nameStorage = 'ConfiguracaoesParametros';
const VERSAO_SCHEMA = '0.0.1';
class ConfiguracaoesParametrosRepository {
  salvar(config: Omit<IParametrosModelSerice, 'versao'>) {
    useSetItemLocalStorage<IParametrosModelSerice>(nameStorage, {
      ...config,
      versao: VERSAO_SCHEMA,
    });
  }

  obter(): IParametrosModelSerice | null {
    return useGetItemLocalStorage<IParametrosModelSerice>(nameStorage);
  }
}
export const useConfiguracaoesParametrosRepository = () =>
  new ConfiguracaoesParametrosRepository();
