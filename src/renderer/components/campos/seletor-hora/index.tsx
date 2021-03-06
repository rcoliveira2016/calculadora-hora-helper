import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DateHelper } from '@/helpers/common/date/';
import { useTheme } from '@mui/material';
import { EventSeletorTempoHora, ValueSeletorTempoHora } from './type';
import './estilo.css';

interface SeletorTempoHoraProps {
  valor: ValueSeletorTempoHora;
  onChange: (event: EventSeletorTempoHora) => void;
}

export default function SeletorTempoHora(props: SeletorTempoHoraProps) {
  const theme = useTheme();

  const [focusStyle, setFocusStyle] = useState<Record<string, string>>({});
  const [minutos, setMinutos] = useState<string>('');
  const [horas, setHoras] = useState<string>('');
  const inputMinuts = useRef<HTMLInputElement>(null);
  const inputHours = useRef<HTMLInputElement>(null);
  const { onChange, valor } = props;
  const calledOnce = React.useRef<NodeJS.Timeout>();

  const themaInput = React.useMemo<React.CSSProperties>(
    () =>
      ({
        '--color-primary': theme.palette.primary.main,
        '--color-secondary': theme.palette.secondary.main,
        '--color-font': theme.palette.text.primary,
        '--color-border': theme.palette.divider,
      } as React.CSSProperties),
    [theme]
  );

  function foramatarNumero() {
    setTimeout(() => {
      setHoras(DateHelper.formatNumberHours(parseInt(horas)));
      setMinutos(DateHelper.formatNumberMinuts(parseInt(minutos)));
    }, 200);
  }

  useEffect(() => {
    setMinutos(valor.minuto.toString());
  }, [valor.minuto]);

  useEffect(() => {
    setHoras(valor.hora.toString());
  }, [valor.hora]);

  useEffect(() => {
    if (calledOnce.current) {
      clearTimeout(calledOnce.current);
    }
    calledOnce.current = setTimeout(() => {
      setHoras(DateHelper.formatNumberHours(valor.hora));
      setMinutos(DateHelper.formatNumberMinuts(valor.minuto));
    }, 600);
  }, [valor]);

  const obterValorEvento = (
    event: React.ChangeEvent<HTMLInputElement>
  ): number => {
    const { value, maxLength } = event.currentTarget;
    let novoValor = parseInt(value.slice(0, maxLength));
    if (novoValor < 0) novoValor = 0;
    return novoValor;
  };
  const onChangeInputMinuto = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const minutosInput = obterValorEvento(event);
      onChange({
        valor: {
          hora: valor.hora,
          minuto: minutosInput > 59 ? 59 : minutosInput,
        },
      });
    },
    [onChange, valor.hora]
  );
  const onChangeInputHora = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        valor: {
          hora: obterValorEvento(event),
          minuto: valor.minuto,
        },
      });
    },
    [onChange, valor.minuto]
  );
  function onFocus(): void {
    setFocusStyle({
      border: '1px solid var(--color-primary)',
      outline: '1px solid var(--color-primary)',
    });
  }
  function onBlur(): void {
    setFocusStyle({});
    foramatarNumero();
  }

  const colarHorarioInput = (texto: string) => {
    if (/^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/.test(texto)) {
      const [hora, minuto] = texto.split(':');
      onChange({
        valor: {
          hora: parseInt(hora),
          minuto: parseInt(minuto),
        },
      });
    }
    if (/^(2[0-3]|[0-1]?[\d])[0-5][\d]$/.test(texto)) {
      onChange({
        valor: {
          hora: parseInt(texto.substring(0, 2)),
          minuto: parseInt(texto.substring(0, 1)),
        },
      });
    }
  };
  function onClickSpan(): void {
    inputMinuts.current?.focus();
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const elementTarget = event.target as HTMLElement;
    if (elementTarget.tagName.toLocaleLowerCase() === 'input') return;

    event.preventDefault();
    if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      navigator.clipboard.readText().then(colarHorarioInput);
    }
  };

  const handleKeyInput = (tipo: 'hora' | 'minuto') => {
    //
    // N??o esta?? funcinando selectionEnd
    //
    return (event: React.KeyboardEvent<HTMLElement>) => {
      const arrowNavagate = tipo === 'hora' ? 'ArrowRight' : 'ArrowLeft';
      console.log(inputHours.current?.selectionEnd);
      if (event.key === arrowNavagate) {
        if (tipo === 'hora' && inputHours.current?.selectionEnd === 0)
          inputMinuts.current?.focus();
        if (tipo === 'minuto' && inputHours.current?.selectionStart === 0)
          inputHours.current?.focus();
      }
    };
  };

  return (
    <div
      tabIndex={-1}
      className="CalcularHoraContainer"
      onKeyDown={handleKeyDown}
      style={{ ...focusStyle, ...themaInput }}
    >
      <input
        ref={inputHours}
        maxLength={2}
        minLength={1}
        value={horas}
        onChange={onChangeInputHora}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyInput('hora')}
        type="number"
      />
      <span onClick={onClickSpan} aria-hidden="true">
        :
      </span>
      <input
        ref={inputMinuts}
        maxLength={2}
        minLength={1}
        value={minutos}
        onChange={onChangeInputMinuto}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyInput('minuto')}
        type="number"
      />
    </div>
  );
}
