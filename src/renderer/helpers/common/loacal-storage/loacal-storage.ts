export const useGetItemLocalStorage = <T>(key: string): T | null => {
  const valorString = localStorage.getItem(key);
  if (valorString === null) {
    return null;
  }

  return JSON.parse(valorString) as T;
};

export const tratarDataJson = <T extends Record<string, any>>(valor: T): T => {
  Object.keys(valor).forEach((key) => {
    const element = valor[key];
    if (element instanceof Date && 'toISOString' in element) {
      Object(valor)[key] = element.toISOString();
    }
  });

  return valor;
};

export const useSetItemLocalStorage = <T>(key: string, valor: T): void => {
  localStorage.setItem(key, JSON.stringify(valor));
};
