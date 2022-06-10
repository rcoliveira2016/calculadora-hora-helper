import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { atualizarParametros } from '@/stores/reducers/master';

export default function ParametrosConfiguracoes() {
  const dispatch = useAppDispatch();
  const parametros = useAppSelector((state) => state.masterReducer.parametros);

  const handleChangeSubtrairAlmoco = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    dispatch(atualizarParametros({ ...parametros, subtrairAlmoco: checked }));
  };

  const handleChangeMinutosParaSubtrairAlmoco = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    dispatch(
      atualizarParametros({
        ...parametros,
        minutosParaSubtrairAlmoco: parseInt(value),
      })
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Numero em minutos almoço"
          variant="standard"
          value={parametros.minutosParaSubtrairAlmoco}
          type={'number'}
          onChange={handleChangeMinutosParaSubtrairAlmoco}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Switch
              checked={parametros.subtrairAlmoco}
              onChange={handleChangeSubtrairAlmoco}
            />
          }
          label="possui subtração horartio almoço"
        />
      </Grid>
    </Grid>
  );
}
