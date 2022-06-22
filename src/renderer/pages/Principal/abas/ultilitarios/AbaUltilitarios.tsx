import SeletorTempoHora from '@/components/campos/seletor-hora';
import {
  EventSeletorTempoHora,
  ValueSeletorTempoHora,
} from '@/components/campos/seletor-hora/type';
import TipoForamtacaoHora from '@/components/campos/tipo-foramtacao-hora';
import { TipoForamtacaoHoraEnum } from '@/components/campos/tipo-foramtacao-hora/type';
import { calculatorExpressionEval } from '@/helpers/calculator-expression';
import { Grid, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { CalcularHoraParaDecimalHelper } from './helper';

export default function AbaUltilitarios() {
  const [tipoForamtacaoHoraDecimal, setTipoForamtacaoHoraDecimal] =
    useState<TipoForamtacaoHoraEnum>(TipoForamtacaoHoraEnum.Decimal);
  const [tipoForamtacaoHoraSelector, setTipoForamtacaoHoraSelector] =
    useState<TipoForamtacaoHoraEnum>(TipoForamtacaoHoraEnum.Decimal);
  const [calucarExpressao, setCalucarExpressao] = useState<string>('');
  const [valorHora, setValorHora] = useState<ValueSeletorTempoHora>({
    hora: 10,
    minuto: 20,
  });
  const calcularExpressao = useMemo(() => {
    const value = calculatorExpressionEval(calucarExpressao);
    console.log(value);
    return CalcularHoraParaDecimalHelper.formatarValor(
      tipoForamtacaoHoraDecimal,
      value
    );
  }, [calucarExpressao, tipoForamtacaoHoraDecimal]);

  function onChangeHora(event: EventSeletorTempoHora) {
    setValorHora(event.valor);
  }
  function calcularData(): string {
    return CalcularHoraParaDecimalHelper.formatarValorValueSeletor(
      tipoForamtacaoHoraSelector,
      valorHora
    );
  }
  function calcularExpressaoODL(): string {
    const value = calculatorExpressionEval(calucarExpressao);

    return CalcularHoraParaDecimalHelper.formatarValor(
      tipoForamtacaoHoraDecimal,
      value
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <SeletorTempoHora valor={valorHora} onChange={onChangeHora} />
        </Grid>
        <Grid item>
          <TipoForamtacaoHora
            valor={tipoForamtacaoHoraSelector}
            onChange={(valor) => setTipoForamtacaoHoraSelector(valor)}
          />
        </Grid>
        <Grid item alignItems={'center'} display="flex">
          <div>
            <strong>Resultado:</strong> {calcularData()}
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <TextField
            label="Calcular"
            variant="outlined"
            value={calucarExpressao}
            onChange={(value) => setCalucarExpressao(value.target.value)}
          />
        </Grid>
        <Grid item>
          <TipoForamtacaoHora
            valor={tipoForamtacaoHoraDecimal}
            onChange={(valor) => setTipoForamtacaoHoraDecimal(valor)}
          />
        </Grid>
        <Grid item alignItems={'center'} display="flex">
          <div>
            <strong>Resultado:</strong> {calcularExpressao}
          </div>
        </Grid>
      </Grid>
    </>
  );
}
