import HistoricoTempoHora from '@/components/grid/historico-tempo-hora/HistoricoTempoHora';
import { RowHistoricoTempoHora } from '@/components/grid/historico-tempo-hora/type';
import {
  calcularHorasTotaisFormatoDecimal,
  calcularHorasTotaisFormatoJira,
} from '@/helpers/stores/reducers/principal';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  atualizarItemHistorico,
  carregarListaHistorico,
  removerItemHistorico,
} from '@/stores/reducers/principal';
import { ItemHistoricoTempoHora } from '@/stores/reducers/principal/type';
import Grid from '@mui/material/Grid';
import { useCallback, useEffect } from 'react';

export function AbaRegistrarHorasGridContainer() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((stateApp) => stateApp.principalReducer);
  function onRemove(item: RowHistoricoTempoHora) {
    const valorState = state.valores.find(
      (x) => x.dataInclusao.getTime() === item.dataInclusao.getTime()
    );
    if (valorState) dispatch(removerItemHistorico(valorState));
  }
  useEffect(() => {
    dispatch(carregarListaHistorico());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onEdit = useCallback(
    (item: ItemHistoricoTempoHora) => {
      dispatch(atualizarItemHistorico(item));
    },
    [dispatch]
  );

  function calcularHorasTotais() {
    return calcularHorasTotaisFormatoDecimal(state.valores);
  }
  function calculaFormatorHorasTotais() {
    return calcularHorasTotaisFormatoJira(state.valores);
  }
  return (
    <Grid
      container
      spacing={2}
      sx={{
        mt: 1,
      }}
    >
      <Grid item>
        <div>
          <span>Horas Totais: </span>
          <b>{calcularHorasTotais()}</b> - <b>{calculaFormatorHorasTotais()}</b>
        </div>
      </Grid>
      <Grid item>
        <HistoricoTempoHora
          onRemove={onRemove}
          onEdit={onEdit}
          valor={state.valores}
        />
      </Grid>
    </Grid>
  );
}
