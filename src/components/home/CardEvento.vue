<script setup lang="ts">
import { computed } from '@vue/runtime-core';
import Evento from 'src/models/domain/eventos/evento';
import { lineClamp, dataLegivel } from '../../utils';
import dayjs from 'dayjs';

const props = defineProps<{
  evento: Evento;
}>();

const data = computed<string>(() => {
  return dataLegivel(props.evento.getData());
});

const hora = computed<string>(() => {
  return props.evento
    .getData()
    ?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
});

const titulo = computed<string>(() => {
  return props.evento.getTitulo();
});

const descricao = computed<string>(() => {
  return props.evento.getDescricao();
});

const rota = computed<string>(() => {
  return `/eventos/${props.evento.getId()}`;
});

const linkCalendario = computed(() => {
  const dataEvento = dayjs(props.evento.getData());
  const inicio = dataEvento.toISOString().replace(/-|:|\./g, '');

  const fim = dataEvento
    .add(1, 'h')
    .toISOString()
    .replace(/-|:|\./g, '');

  const local = 'Centro+De+Comunicação,+Turismo+e+Artes+-+CCTA/UFPB';

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${titulo.value}&dates=${inicio}/${fim}&details=${descricao.value}&location=${local}&sf=true&output=xml`;
});
</script>

<template>
  <q-card class="col-md-3" flat bordered style="max-width: 300px">
    <q-card-section class="q-pt-xs">
      <div class="text-overline">{{ data }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ titulo }}</div>
      <div v-html="lineClamp(descricao)" class="text-caption text-grey"></div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn
        :href="linkCalendario"
        target="_blank"
        flat
        round
        icon="o_insert_invitation"
      >
        {{ hora }}
      </q-btn>
      <q-btn flat color="primary" :to="rota"> Detalhes </q-btn>
    </q-card-actions>
  </q-card>
</template>
