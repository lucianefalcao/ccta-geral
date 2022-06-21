const lineClamp = (texto: string) => {
  if (texto.length > 145) {
    return texto.slice(0, 145) + '&hellip;';
  }

  return texto;
};

const dataLegivel = (data: Date): string | null => {
  return data?.toLocaleDateString('pt-BR') ?? null;
};

export { lineClamp, dataLegivel };
