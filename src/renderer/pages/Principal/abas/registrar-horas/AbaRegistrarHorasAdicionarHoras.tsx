import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Guid } from 'guid-typescript';

import SaveIcon from '@mui/icons-material/Save';
import { IconButton, TextField } from '@mui/material';
import { EventSeletorTempoHora } from '@/components/campos/seletor-hora/type';
import SeletorTempoHora from '@/components/campos/seletor-hora';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { SeletorTempoHoraHelper } from '@/helpers/components/campos/seletor-hora';
import {
  alterarHoraFinal,
  alterarHoraInicial,
  adicionarItemHistorico,
} from '@/stores/reducers/principal/index';
import { AcoesCalculoData } from './type';

const DescricaoAcoesCalculoData = [
  { value: AcoesCalculoData.adicao, text: 'Adição' },
  { value: AcoesCalculoData.subtracao, text: 'Subtração' },
];
export default function AbaRegistrarHorasAdicionarHoras() {
  const { horaInicial: valorHoraInicial, horaFinal: valorHoraFinal } =
    useAppSelector((state) => state.principalReducer);
  const [acaoCalculo, setAcaoCalculo] = useState(AcoesCalculoData.subtracao);
  const [tag, setTag] = useState('');
  const dispatch = useAppDispatch();

  function onChangeValorInicial(event: EventSeletorTempoHora) {
    dispatch(alterarHoraInicial(event.valor));
  }

  function onChangeValorFinal(event: EventSeletorTempoHora) {
    dispatch(alterarHoraFinal(event.valor));
  }

  function onChangeAcaoCalulo(event: SelectChangeEvent<AcoesCalculoData>) {
    setAcaoCalculo(event.target.value as AcoesCalculoData);
  }

  function onAddHistiricoCalculo() {
    dispatch(
      adicionarItemHistorico({
        dataInclusao: new Date(),
        final: valorHoraFinal,
        inicio: valorHoraInicial,
        tipoAcao: acaoCalculo,
        tag,
        id: Guid.create().toString(),
      })
    );
    setTag('');
  }

  function calcularData(): string {
    return SeletorTempoHoraHelper.calcularData(
      acaoCalculo,
      valorHoraFinal,
      valorHoraInicial
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <SeletorTempoHora
          valor={valorHoraInicial}
          onChange={onChangeValorInicial}
        />
      </Grid>
      <Grid item>
        <Select value={acaoCalculo} onChange={onChangeAcaoCalulo}>
          {DescricaoAcoesCalculoData.map((x) => (
            <MenuItem key={x.value} value={x.value}>
              {x.text}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <SeletorTempoHora
          valor={valorHoraFinal}
          onChange={onChangeValorFinal}
        />
      </Grid>
      <Grid item>
        <TextField
          label="tag"
          variant="outlined"
          style={{ width: '100px' }}
          value={tag}
          onChange={(value) => setTag(value.target.value)}
        />
      </Grid>
      <Grid item alignItems={'center'} display={'flex'}>
        <div>
          <strong>Resultado:</strong> {calcularData()}
        </div>
      </Grid>
      <Grid item alignItems={'center'} display={'flex'}>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={onAddHistiricoCalculo}
        >
          <SaveIcon fontSize="large" color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
