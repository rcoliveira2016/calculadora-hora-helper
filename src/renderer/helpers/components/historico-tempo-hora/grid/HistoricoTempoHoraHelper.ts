import { ValueSeletorTempoHora } from '@/components/campos/seletor-hora/type';
import { RowHistoricoTempoHora } from '@/components/grid/historico-tempo-hora/type';
import { DateHelper } from '@/helpers/common/date';
import { AcoesCalculoData } from '@/pages/Principal/abas/registrar-horas/type';
import { ItemHistoricoTempoHoraModelState } from '@/stores/reducers/principal/type';
import { SeletorTempoHoraHelper } from '@/helpers/components/campos/seletor-hora/';

export class HistoricoTempoHoraHelper {
  static setarSubtarir(item: ItemHistoricoTempoHoraModelState) {
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
  }

  static craeteRow(
    item: ItemHistoricoTempoHoraModelState
  ): RowHistoricoTempoHora {
    const inicio = DateHelper.msToTime(
      SeletorTempoHoraHelper.toMilliseconds(item.inicio)
    );
    const final = DateHelper.msToTime(
      SeletorTempoHoraHelper.toMilliseconds(item.final)
    );

    const acao =
      item.tipoAcao === AcoesCalculoData.adicao ? 'Adição' : 'Subtração';
    const total = SeletorTempoHoraHelper.calcularData(
      item.tipoAcao,
      item.final,
      item.inicio,
      item.subtrair
    );
    const fJira = SeletorTempoHoraHelper.formatarJira(
      item.tipoAcao,
      item.final,
      item.inicio,
      item.subtrair
    );
    const fDecimal = SeletorTempoHoraHelper.formatarDecimal(
      item.tipoAcao,
      item.final,
      item.inicio,
      item.subtrair
    );
    const subtrair = item.subtrair
      ? SeletorTempoHoraHelper.formatarHorarioPorDecimal(item.subtrair)
      : undefined;

    return {
      inicio,
      final,
      tipoAcao: acao,
      total,
      fJira,
      fDecimal,
      dataInclusao: item.dataInclusao,
      id: item.id,
      tag: item.tag,
      subtrair,
    };
  }

  static textoParaValueSeletorTempoHora(texto: string) {
    if (!this.validarTextoForamatoHoraMinuto(texto)) return undefined;
    const valoresSeparados = texto.split(':');
    return {
      hora: parseInt(valoresSeparados[0]),
      minuto: parseInt(valoresSeparados[1]),
    } as ValueSeletorTempoHora;
  }

  static textoParaDecimal(texto: string) {
    if (!this.validarTextoForamatoHoraMinuto(texto)) return undefined;
    const valoresSeparados = texto.split(':');

    const hora = parseInt(valoresSeparados[0]);
    const minuto = parseInt(valoresSeparados[1]);

    return DateHelper.getMillisecondToDeciamlNumber(
      DateHelper.hourstoMinutesToMilliseconds(hora, minuto)
    );
  }

  static validarTextoForamatoHoraMinuto(texto: string) {
    return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(texto);
  }
}
