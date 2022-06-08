/* eslint-disable react-hooks/rules-of-hooks */
import { ValueSeletorTempoHora } from '@/components/campos/seletor-hora/type';
import { useCalcularHoraRepository } from '@/service/historico-tempo-horas/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPrincipalState, ItemHistoricoTempoHora } from './type';

const calcularHoraRepository = useCalcularHoraRepository();

const setarItensHistorico = (
  itens: ItemHistoricoTempoHora[]
): ItemHistoricoTempoHora[] => {
  return calcularHoraRepository.AddAllHistorico(itens);
};

const initialState: IPrincipalState = {
  valores: [],
  horaFinal: { hora: 11, minuto: 0 },
  horaInicial: { hora: 9, minuto: 0 },
};

export const principalSlice = createSlice({
  name: 'principal',
  initialState,
  reducers: {
    carregarListaHistorico: (state: IPrincipalState) => {
      state.valores = calcularHoraRepository.getAllHistorico();
    },
    adicionarItemHistorico: (
      state: IPrincipalState,
      action: PayloadAction<ItemHistoricoTempoHora>
    ) => {
      state.valores = setarItensHistorico([...state.valores, action.payload]);
    },
    resetListaHistorico: (state: IPrincipalState) => {
      state.valores = setarItensHistorico([]);
    },
    alterarHoraInicial: (
      state: IPrincipalState,
      action: PayloadAction<ValueSeletorTempoHora>
    ) => {
      state.horaInicial = action.payload;
    },
    alterarHoraFinal: (
      state: IPrincipalState,
      action: PayloadAction<ValueSeletorTempoHora>
    ) => {
      state.horaFinal = action.payload;
    },
    inverterValoresHoras: (state: IPrincipalState) => {
      const { horaInicial } = state;
      state.horaInicial = state.horaFinal;
      state.horaFinal = horaInicial;
    },
    subtituirValorHoraInicio: (state: IPrincipalState) => {
      state.horaInicial = state.horaFinal;
    },
    subtituirValorHoraFinal: (state: IPrincipalState) => {
      state.horaFinal = state.horaInicial;
    },
    atualizarItemHistorico: (
      state: IPrincipalState,
      action: PayloadAction<ItemHistoricoTempoHora>
    ) => {
      const lista = state.valores.map((x) =>
        x.dataInclusao.getTime() === action.payload.dataInclusao.getTime()
          ? action.payload
          : x
      );
      state.valores = setarItensHistorico(lista);
    },
  },
});
