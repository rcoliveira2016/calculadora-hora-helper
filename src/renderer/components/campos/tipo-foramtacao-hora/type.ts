export interface TipoForamtacaoHoraProps {
  valor: TipoForamtacaoHoraEnum;
  onChange: (valor: TipoForamtacaoHoraEnum) => void;
}

export enum TipoForamtacaoHoraEnum {
  Jira = 1,
  Decimal = 2,
  HoraMinuto = 3,
}
