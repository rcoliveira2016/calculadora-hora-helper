/* eslint-disable react-hooks/rules-of-hooks */
import { DateHelper } from '@/helpers/common/date';
import { SeletorTempoHoraHelper } from '@/helpers/components/campos/seletor-hora';
import { ItemHistoricoTempoHoraModelState } from '@/stores/reducers/principal/type';
import { useObterStateConfiguracoesParametros } from '../../service/configuracoes-parametros';

export const calcularValoresHorasTotaisMilisegundos = (
  itens: ItemHistoricoTempoHoraModelState[]
): number => {
  return itens.reduce((acc, item) => {
    let valorTotalMisseconds = SeletorTempoHoraHelper.obterValorData(
      item.tipoAcao,
      item.final,
      item.inicio
    );
    valorTotalMisseconds = item.subtrair
      ? SeletorTempoHoraHelper.subtrairDecimalEmMilliseconds(
          item.subtrair,
          valorTotalMisseconds
        )
      : valorTotalMisseconds;

    return acc + valorTotalMisseconds;
  }, 0);
};

export function calcularHorasTotaisFormatoDecimal(
  itens: ItemHistoricoTempoHoraModelState[]
) {
  return DateHelper.getMillisecondToDecimalHours(
    calcularValoresHorasTotaisMilisegundos(itens)
  );
}
export function calcularHorasTotaisFormatoJira(
  itens: ItemHistoricoTempoHoraModelState[]
) {
  return SeletorTempoHoraHelper.formatarJiraPorDecimal(
    DateHelper.getMillisecondToDecimalHoursNumber(
      calcularValoresHorasTotaisMilisegundos(itens)
    )
  );
}

export const setarSubtarir = (item: ItemHistoricoTempoHoraModelState) => {
  if (item.subtrair !== undefined) return;

  const parametros = useObterStateConfiguracoesParametros();
  const tempoEmMunitos = parametros.minutosParaSubtrairAlmoco;
  const tempoEmDecimal = DateHelper.getMillisecondToDeciamlNumber(
    DateHelper.hourstoMinutesToMilliseconds(0, tempoEmMunitos)
  );

  if (
    item.inicio.hora <= 12 &&
    ((item.final.hora >= 12 && item.final.minuto >= tempoEmMunitos) ||
      item.final.hora > 12)
  ) {
    item.subtrair = tempoEmDecimal;
  }
};

export const aplicarRegrasHistorico = (
  itens: ItemHistoricoTempoHoraModelState[]
): ItemHistoricoTempoHoraModelState[] => {
  const parametros = useObterStateConfiguracoesParametros();
  if (parametros.subtrairAlmoco)
    return itens.map((x) => {
      const itemNovo = { ...x };
      setarSubtarir(itemNovo);
      return itemNovo;
    });

  return itens;
};
