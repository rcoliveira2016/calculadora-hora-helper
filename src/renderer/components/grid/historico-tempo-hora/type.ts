import { ValueSeletorTempoHora } from '@/components/campos/seletor-hora/type';
import { AcoesCalculoData } from '@/pages/Principal/abas/registrar-horas/type';

export interface HistoricoTempoHoraProps {
  valor: ItemHistoricoTempoHora[];
  onRemove: (row: RowHistoricoTempoHora) => void;
  onEdit: (row: ItemHistoricoTempoHora) => void;
}

export interface ItemHistoricoTempoHora {
  id: string;
  inicio: ValueSeletorTempoHora;
  final: ValueSeletorTempoHora;
  tipoAcao: AcoesCalculoData;
  dataInclusao: Date;
  tag: string;
  subtrair?: number;
}

export type EventHistoricoTempoHora = {
  itemExcluido: ItemHistoricoTempoHora;
};

export type RowHistoricoTempoHora = {
  inicio: string;
  final: string;
  tipoAcao: string;
  total: string;
  fJira: string;
  fDecimal: string;
  dataInclusao: Date;
  id: string;
  tag: string;
  subtrair?: string;
};
