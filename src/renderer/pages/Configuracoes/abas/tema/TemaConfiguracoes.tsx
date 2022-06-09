import SeletorThema from '@/components/campos/seletor-thema/SeletorThema';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { setarConfiguracaoTema } from '@/stores/reducers/master';
import { useListaOpcoesMuiThemes, OpcoesMuiThemes } from '@/styles/mui/theme';
import Grid from '@mui/material/Grid';

export default function TemaConfiguracoes() {
  const dispatch = useAppDispatch();
  const listaOpcoesThema = useListaOpcoesMuiThemes();
  const { nomeThema } = useAppSelector(
    (state) => state.masterReducer.themaAtual
  );
  const onSelecionadoThema = (thema: string) => {
    dispatch(
      setarConfiguracaoTema({
        nome: thema,
        acaoCriarThema: OpcoesMuiThemes[thema],
      })
    );
  };

  return (
    <Grid container flexDirection={'row'} spacing={2}>
      {listaOpcoesThema.map((opcao) => (
        <Grid item>
          <SeletorThema
            key={opcao}
            thema={opcao}
            themaSelecionado={nomeThema}
            onSelecionado={onSelecionadoThema}
          />
        </Grid>
      ))}
    </Grid>
  );
}
