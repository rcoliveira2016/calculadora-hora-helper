/* eslint-disable react-hooks/rules-of-hooks */
import {
  useGetItemLocalStorage,
  useSetItemLocalStorage,
} from '@/helpers/common/loacal-storage/loacal-storage';
import { ItemHistoricoTempoHoraModelState } from '@/stores/reducers/principal/type';
import { ItemHistoricoTempoHoraModelService } from './type';

const nameHistoricoStorage = 'HistoricoHora';
const VERSAO_SCHEMA = '0.0.1';
class CalcularHoraRepository {
  nameHistoricoStorage = 'HistoricoHora';

  AddAllHistorico(valores: ItemHistoricoTempoHoraModelState[]) {
    useSetItemLocalStorage<ItemHistoricoTempoHoraModelService[]>(
      nameHistoricoStorage,
      valores.map((x) => ({
        ...x,
        versao: VERSAO_SCHEMA,
        dataInclusao: x.dataInclusao.toISOString(),
      }))
    );
    return valores;
  }

  getAllHistorico(): ItemHistoricoTempoHoraModelState[] {
    const listaStorage =
      useGetItemLocalStorage<ItemHistoricoTempoHoraModelService[]>(
        nameHistoricoStorage
      );
    if (!listaStorage) return [];
    return listaStorage.map((item) => ({
      id: item.id,
      dataInclusao: new Date(item.dataInclusao),
      final: item.final,
      inicio: item.inicio,
      tag: item.tag,
      tipoAcao: item.tipoAcao,
      subtrair: item.subtrair,
    }));
  }
}
export const useCalcularHoraRepository = () => new CalcularHoraRepository();
