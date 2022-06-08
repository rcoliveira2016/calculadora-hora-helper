import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Zoom from '@mui/material/Zoom';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import CachedIcon from '@mui/icons-material/Cached';
import { useAppDispatch } from '@/stores/hooks';
import {
  inverterValoresHoras,
  subtituirValorHoraFinal,
  subtituirValorHoraInicio,
  resetListaHistorico,
} from '@/stores/reducers/principal/index';

export function AbaRegistrarHorasToolbar() {
  const dispatch = useAppDispatch();

  function inverterValoresHorasEvent() {
    dispatch(inverterValoresHoras());
  }
  function subtituirValorHoraInicioEvent() {
    dispatch(subtituirValorHoraInicio());
  }
  function subtituirValorHoraFinalEvent() {
    dispatch(subtituirValorHoraFinal());
  }
  function resetarLista() {
    dispatch(resetListaHistorico());
  }
  return (
    <Grid container>
      <Grid sx={{ py: 1 }} item>
        <Tooltip TransitionComponent={Zoom} title="inverter horas">
          <IconButton aria-label="delete" onClick={inverterValoresHorasEvent}>
            <CompareArrowsIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title="subtituir valor para inicio">
          <IconButton onClick={subtituirValorHoraInicioEvent}>
            <FastRewindIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title="subtituir valor para final">
          <IconButton onClick={subtituirValorHoraFinalEvent}>
            <FastForwardIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title="subtituir valor para final">
          <IconButton onClick={resetarLista}>
            <CachedIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
