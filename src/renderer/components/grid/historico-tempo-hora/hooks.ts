/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
import { HistoricoTempoHoraHelper } from '@/helpers/components/historico-tempo-hora/grid/HistoricoTempoHoraHelper';
import { GridCellEditCommitParams } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { HistoricoTempoHoraProps } from './type';

export function useCellEditCommit(props: HistoricoTempoHoraProps) {
  const { onEdit, valor: listaHitorico } = props;

  const handleCellEditCommit = useCallback(
    (params: GridCellEditCommitParams) => {
      let item = listaHitorico.find((x) => x.id === params.id);
      if (!item) return;
      item = { ...item };
      switch (params.field) {
        case 'tag':
          item.tag = params.value as string;
          break;
        case 'subtrair':
          const valoDecimal = HistoricoTempoHoraHelper.textoParaDecimal(
            params.value as string
          );

          item.subtrair = valoDecimal;
          break;
        case 'inicio':
          const inicio =
            HistoricoTempoHoraHelper.textoParaValueSeletorTempoHora(
              params.value as string
            );
          if (!inicio) return;
          item.inicio = inicio;
          break;
        case 'final':
          const final = HistoricoTempoHoraHelper.textoParaValueSeletorTempoHora(
            params.value as string
          );
          if (!final) return;
          item.final = final;
          break;
        default:
          break;
      }
      onEdit(item);
    },
    [listaHitorico]
  );

  return handleCellEditCommit;
}
