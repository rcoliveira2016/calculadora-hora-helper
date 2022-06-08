import { ValueSeletorTempoHora } from '@/components/campos/seletor-hora/type';
import { TipoForamtacaoHoraEnum } from '@/components/campos/tipo-foramtacao-hora/type';
import { DateHelper } from '@/helpers/common/date';
import { SeletorTempoHoraHelper } from '@/helpers/components/campos/seletor-hora';

export class CalcularHoraParaDecimalHelper {
  static formatarValor(tipo: TipoForamtacaoHoraEnum, valor: number) {
    switch (tipo) {
      case TipoForamtacaoHoraEnum.Jira:
        return SeletorTempoHoraHelper.formatarJiraPorDecimal(valor);
      case TipoForamtacaoHoraEnum.HoraMinuto:
        return SeletorTempoHoraHelper.formatarHorarioPorDecimal(valor);
      case TipoForamtacaoHoraEnum.Decimal:
      default:
        return valor.toFixed(2);
    }
  }

  static formatarValorValueSeletor(
    tipo: TipoForamtacaoHoraEnum,
    valor: ValueSeletorTempoHora
  ) {
    switch (tipo) {
      case TipoForamtacaoHoraEnum.Jira:
        return this.valueSeletorTempoHoraParaJira(valor);
      case TipoForamtacaoHoraEnum.HoraMinuto:
        return DateHelper.ToTime(valor.hora, valor.minuto);
      case TipoForamtacaoHoraEnum.Decimal:
      default:
        return SeletorTempoHoraHelper.formatarUnicaDecimal(valor);
    }
  }

  static valueSeletorTempoHoraParaJira(valor: ValueSeletorTempoHora) {
    const milisecunds = DateHelper.hourstoMinutesToMilliseconds(
      valor.hora,
      valor.minuto
    );
    return SeletorTempoHoraHelper.millisecondsParaFormatoJira(milisecunds);
  }
}
