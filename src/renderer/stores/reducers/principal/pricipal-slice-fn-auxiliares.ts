/* eslint-disable react-hooks/rules-of-hooks */
import { aplicarRegrasHistorico } from '@/helpers/stores/reducers/principal';
import { useCalcularHoraRepository } from '@/service/historico-tempo-horas/index';
import { ItemHistoricoTempoHoraModelState } from './type';

const calcularHoraRepository = useCalcularHoraRepository();

export const setarItensHistorico = (
  itens: ItemHistoricoTempoHoraModelState[]
): ItemHistoricoTempoHoraModelState[] => {
  const novoItens = aplicarRegrasHistorico(itens);
  return calcularHoraRepository.AddAllHistorico(novoItens);
};
