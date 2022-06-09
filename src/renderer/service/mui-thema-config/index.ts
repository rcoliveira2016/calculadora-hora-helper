/* eslint-disable react-hooks/rules-of-hooks */
import {
  useSetItemLocalStorage,
  useGetItemLocalStorage,
} from '@/helpers/common/loacal-storage/loacal-storage';
import { MuiThemeConfigModelService } from './type';

const nameStorage = 'MuiThemeConfig';
const VERSAO_SCHEMA = '0.0.1';
class MuiThemeConfigRepository {
  salvar(config: Omit<MuiThemeConfigModelService, 'versao'>) {
    useSetItemLocalStorage<MuiThemeConfigModelService>(nameStorage, {
      ...config,
      versao: VERSAO_SCHEMA,
    });
  }

  obter(): MuiThemeConfigModelService | null {
    return useGetItemLocalStorage<MuiThemeConfigModelService>(nameStorage);
  }
}
export const useMuiThemeConfigRepository = () => new MuiThemeConfigRepository();
