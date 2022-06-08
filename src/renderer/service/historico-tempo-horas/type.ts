import { ValueSeletorTempoHora } from '@/components/campos/seletor-hora/type';
import { AcoesCalculoData } from '@/pages/Principal/abas/registrar-horas/type';

export interface ItemHistoricoTempoHoraModelService {
  id: string;
  inicio: ValueSeletorTempoHora;
  final: ValueSeletorTempoHora;
  tipoAcao: AcoesCalculoData;
  dataInclusao: string;
  tag: string;
  subtrair?: number;
  versao: string;
}
