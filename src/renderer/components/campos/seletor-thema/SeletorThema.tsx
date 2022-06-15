import { useAppSelector } from '@/stores/hooks';
import { OpcoesMuiThemes } from '@/styles/mui/theme';
import {
  Box,
  Paper,
  Stack,
  styled,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { ISeletorThemaProps } from './type';

export default function SeletorThema(props: ISeletorThemaProps) {
  const { heDarkMode } = useAppSelector(
    (state) => state.masterReducer.themaAtual
  );
  const { thema: themaProps, themaSelecionado, onSelecionado } = props;
  const [themeAtual, setThemeAtual] = useState<Theme>();
  const [estaSelecionado, setEstaSelecionado] = useState(false);

  useEffect(() => {
    setThemeAtual(createTheme(OpcoesMuiThemes[themaProps](heDarkMode)));
  }, [themaProps, heDarkMode]);

  useEffect(() => {
    setEstaSelecionado(themaProps === themaSelecionado);
  }, [themaSelecionado, themaProps]);

  const estiloBoxPricipal: SxProps<Theme> = {
    borderRadius: '4px',
    width: '150px',
    boxShadow: estaSelecionado ? 5 : 1,
    border: estaSelecionado
      ? `1px solid ${
          themeAtual?.palette.mode === 'dark'
            ? themeAtual?.palette.warning.dark
            : themeAtual?.palette.warning.light
        }`
      : '',
  };

  const ItemPrimary = styled(Paper)(() => {
    if (!themeAtual) return {};

    return {
      backgroundColor: themeAtual.palette.primary.main,
      ...themeAtual.typography.body2,
      padding: themeAtual.spacing(2),
      textAlign: 'center',
      color: themeAtual.palette.getContrastText(
        themeAtual.palette.primary.main
      ),
      borderRadius: 0,
    };
  });

  const ItemSecondary = styled(Paper)(() => {
    if (!themeAtual) return {};

    return {
      backgroundColor: themeAtual.palette.secondary.main,
      ...themeAtual.typography.body2,
      padding: themeAtual.spacing(2),
      textAlign: 'center',
      color: themeAtual.palette.getContrastText(
        themeAtual.palette.secondary.main
      ),
      borderRadius: 0,
    };
  });

  return (
    <Box sx={estiloBoxPricipal} onClick={() => onSelecionado(themaProps)}>
      <Typography sx={{ p: 1 }} textAlign={'center'}>
        {themaProps}
      </Typography>
      <Stack>
        <ItemPrimary>Primary</ItemPrimary>
        <ItemSecondary>Secondary</ItemSecondary>
      </Stack>
    </Box>
  );
}
