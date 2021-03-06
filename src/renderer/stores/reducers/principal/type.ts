import { ValueSeletorTempoHora } from '@/components/campos/seletor-hora/type';
import { AcoesCalculoData } from '@/pages/Principal/abas/registrar-horas/type';

export interface IPrincipalState {
  valores: ItemHistoricoTempoHoraModelState[];
  horaInicial: ValueSeletorTempoHora;
  horaFinal: ValueSeletorTempoHora;
}

export interface ItemHistoricoTempoHoraModelState {
  id: string;
  inicio: ValueSeletorTempoHora;
  final: ValueSeletorTempoHora;
  tipoAcao: AcoesCalculoData;
  dataInclusao: Date;
  tag: string;
  subtrair?: number;
}
