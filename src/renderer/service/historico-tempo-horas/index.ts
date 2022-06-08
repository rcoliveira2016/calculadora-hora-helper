/* eslint-disable react-hooks/rules-of-hooks */
import { useSetItemLocalStorage } from '@/helpers/common/loacal-storage/loacal-storage';
import { ItemHistoricoTempoHora } from '@/stores/reducers/principal/type';

const nameHistoricoStorage = 'HistoricoHora';
const VERSAO_SCHEMA = '0.0.1';
class CalcularHoraRepository {
  nameHistoricoStorage = 'HistoricoHora';

  AddAllHistorico(valores: ItemHistoricoTempoHora[]) {
    useSetItemLocalStorage(
      nameHistoricoStorage,
      valores.map((x) => ({
        ...x,
        versao: VERSAO_SCHEMA,
      }))
    );
    return valores;
  }

  getAllHistorico(): ItemHistoricoTempoHora[] {
    const novaLista: ItemHistoricoTempoHora[] = [];
    const json = localStorage.getItem(nameHistoricoStorage);
    if (!json) return [];
    const lista = JSON.parse(json) as any[];
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      element.dataInclusao = new Date(element.dataInclusao as string);
      novaLista.push({
        id: element.id,
        dataInclusao: element.dataInclusao,
        final: element.final,
        inicio: element.inicio,
        tag: element.tag,
        tipoAcao: element.tipoAcao,
        subtrair: element.subtrair,
      });
    }
    return novaLista;
  }
}
export const useCalcularHoraRepository = () => new CalcularHoraRepository();
