import { DateHelper } from '@/helpers/common/date';
import { SeletorTempoHoraHelper } from '@/helpers/components/campos/seletor-hora';
import { ItemHistoricoTempoHora } from '@/stores/reducers/principal/type';

export const calcularValoresHorasTotaisMilisegundos = (
  itens: ItemHistoricoTempoHora[]
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
  itens: ItemHistoricoTempoHora[]
) {
  return DateHelper.getMillisecondToDecimalHours(
    calcularValoresHorasTotaisMilisegundos(itens)
  );
}
export function calcularHorasTotaisFormatoJira(
  itens: ItemHistoricoTempoHora[]
) {
  return SeletorTempoHoraHelper.formatarJiraPorDecimal(
    DateHelper.getMillisecondToDecimalHoursNumber(
      calcularValoresHorasTotaisMilisegundos(itens)
    )
  );
}

export const setarSubtarir = (item: ItemHistoricoTempoHora) => {
  if (item.subtrair !== undefined) return;

  const tempoEmMunitos = 20;
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
