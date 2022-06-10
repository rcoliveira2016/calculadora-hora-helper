import { masterSlice } from './master-slice';

export const { setarConfiguracaoTema, setarDarkMode, atualizarParametros } =
  masterSlice.actions;
export default masterSlice.reducer;
