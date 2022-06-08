import { useCallback } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TipoForamtacaoHoraEnum, TipoForamtacaoHoraProps } from './type';

export default function TipoForamtacaoHora(props: TipoForamtacaoHoraProps) {
  const { valor, onChange: onChangeEvent } = props;

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const valorInput = parseInt((event.target as HTMLInputElement).value);
      onChangeEvent(valorInput as TipoForamtacaoHoraEnum);
    },
    [onChangeEvent]
  );

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Tipo foramto
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={valor}
        onChange={onChange}
      >
        <FormControlLabel
          value={TipoForamtacaoHoraEnum.Decimal}
          control={<Radio size="small" />}
          label="Decimal"
        />
        <FormControlLabel
          value={TipoForamtacaoHoraEnum.Jira}
          control={<Radio size="small" />}
          label="Jira"
        />
        <FormControlLabel
          value={TipoForamtacaoHoraEnum.HoraMinuto}
          control={<Radio size="small" />}
          label="HH:MM"
        />
      </RadioGroup>
    </FormControl>
  );
}
