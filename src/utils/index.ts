import dayjs from 'dayjs';
import Evento from 'src/models/domain/eventos/evento';

const lineClamp = (texto: string) => {
  if (texto.length > 145) {
    return texto.slice(0, 145) + '&hellip;';
  }

  return texto;
};

const dataLegivel = (data: Date | null): string | null => {
  return data?.toLocaleDateString('pt-BR') ?? null;
};

const adicionarEventoAgenda = (evento: Evento) => {
  const dataEvento = dayjs(evento.getData());
  const inicio = dataEvento.toISOString().replace(/-|:|\./g, '');

  const fim = dataEvento
    .add(1, 'h')
    .toISOString()
    .replace(/-|:|\./g, '');

  const local = 'Centro+De+Comunicação,+Turismo+e+Artes+-+CCTA/UFPB';

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${evento.getTitulo()}&dates=${inicio}/${fim}&details=${evento.getDescricao()}&location=${local}&sf=true&output=xml`;
};

export { lineClamp, dataLegivel, adicionarEventoAgenda };
