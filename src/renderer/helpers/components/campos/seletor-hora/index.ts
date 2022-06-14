import { ValueSeletorTempoHora } from '@/components/campos/seletor-hora/type';
import { DateHelper } from '@/helpers/common/date';
import { AcoesCalculoData } from '@/pages/Principal/abas/registrar-horas/type';

class SeletorTempoHora {
  readonly horaEmMilissegundos = 3600000;

  readonly minutoEmMilissegundos = 60000;

  subtrairDecimalEmMilliseconds(subtarir: number, milliseconds: number) {
    return DateHelper.subtrairDecimalEmMilliseconds(subtarir, milliseconds);
  }

  toMilliseconds(valor: ValueSeletorTempoHora): number {
    return DateHelper.hourstoMinutesToMilliseconds(valor.hora, valor.minuto);
  }

  obterValorData(
    tipoAcaoCalculo: AcoesCalculoData,
    valorHoraFinal: ValueSeletorTempoHora,
    valorHoraInicial: ValueSeletorTempoHora
  ): number {
    switch (tipoAcaoCalculo) {
      case AcoesCalculoData.adicao:
        return (
          this.toMilliseconds(valorHoraFinal) +
          this.toMilliseconds(valorHoraInicial)
        );
      case AcoesCalculoData.subtracao:
        return (
          this.toMilliseconds(valorHoraFinal) -
          this.toMilliseconds(valorHoraInicial)
        );
      default:
        return 0;
    }
  }

  calcularData(
    tipoAcaoCalculo: AcoesCalculoData,
    valorHoraFinal: ValueSeletorTempoHora,
    valorHoraInicial: ValueSeletorTempoHora,
    subtarirDecinal?: number
  ): string {
    let numero = this.obterValorData(
      tipoAcaoCalculo,
      valorHoraFinal,
      valorHoraInicial
    );
    if (subtarirDecinal)
      numero = this.subtrairDecimalEmMilliseconds(subtarirDecinal, numero);
    const heNegativo = numero < 0;
    numero = numero < 0 ? -1 * numero : numero;
    if (!numero) return '00:00';

    return DateHelper.msToTime(numero, heNegativo);
  }

  formatarHorarioPorDecimal(decimal: number): string {
    const milliseconds = DateHelper.getDeciamlToMillisecond(decimal);

    return DateHelper.msToTime(milliseconds, milliseconds < 0);
  }

  millisecondsParaFormatoJira(milliseconds: number): string {
    const timeValue = DateHelper.getTimeValueByMillisecond(milliseconds);
    const retorno: string[] = [];
    if (timeValue.hours > 0) retorno.push(`${timeValue.hours}h`);

    if (timeValue.minutes > 0) retorno.push(`${timeValue.minutes}m`);

    return retorno.join(' ');
  }

  formatarJira(
    tipoAcaoCalculo: AcoesCalculoData,
    valorHoraFinal: ValueSeletorTempoHora,
    valorHoraInicial: ValueSeletorTempoHora,
    subtarirDecinal?: number
  ): string {
    let numero = this.obterValorData(
      tipoAcaoCalculo,
      valorHoraFinal,
      valorHoraInicial
    );

    if (subtarirDecinal)
      numero = this.subtrairDecimalEmMilliseconds(subtarirDecinal, numero);
    numero = numero < 0 ? -1 * numero : numero;
    if (!numero) return '0h 0m';

    return this.millisecondsParaFormatoJira(numero);
  }

  formatarJiraPorDecimal(decimal: number): string {
    const milliseconds = DateHelper.getDeciamlToMillisecond(decimal);

    return this.millisecondsParaFormatoJira(milliseconds);
  }

  formatarDecimal(
    tipoAcaoCalculo: AcoesCalculoData,
    valorHoraFinal: ValueSeletorTempoHora,
    valorHoraInicial: ValueSeletorTempoHora,
    subtarirDecinal?: number
  ): string {
    let numero = this.obterValorData(
      tipoAcaoCalculo,
      valorHoraFinal,
      valorHoraInicial
    );
    if (subtarirDecinal)
      numero = this.subtrairDecimalEmMilliseconds(subtarirDecinal, numero);
    return DateHelper.getMillisecondToDecimalHours(numero);
  }

  formatarUnicaDecimal(valorHora: ValueSeletorTempoHora): string {
    const numero = this.toMilliseconds(valorHora);
    return DateHelper.getMillisecondToDecimalHours(numero);
  }
}

export const SeletorTempoHoraHelper = new SeletorTempoHora();
