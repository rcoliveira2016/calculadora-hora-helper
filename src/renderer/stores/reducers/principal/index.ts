import { principalSlice } from './pricipal-slice';

export const {
  alterarHoraFinal,
  alterarHoraInicial,
  adicionarItemHistorico,
  resetListaHistorico,
  inverterValoresHoras,
  subtituirValorHoraFinal,
  subtituirValorHoraInicio,
  carregarListaHistorico,
  atualizarItemHistorico,
  removerItemHistorico,
} = principalSlice.actions;
export default principalSlice.reducer;
