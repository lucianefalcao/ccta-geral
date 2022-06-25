<script setup lang="ts">
import { computed } from '@vue/runtime-core';
import Evento from 'src/models/domain/eventos/evento';
import { lineClamp, dataLegivel, adicionarEventoAgenda } from '../../utils';

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
</script>

<template>
  <q-card class="col-md-12" flat bordered style="max-width: 300px">
    <q-card-section class="q-pt-xs">
      <div class="text-overline">{{ data }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ titulo }}</div>
      <div class="text-caption text-grey">{{ lineClamp(descricao) }}</div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn
        :href="adicionarEventoAgenda(evento)"
        target="_blank"
        flat
        round
        icon="o_insert_invitation"
      >
        <q-tooltip> Adicionar ao Google Agenda </q-tooltip>
        {{ hora }}
      </q-btn>
      <q-space></q-space>
      <q-btn flat color="primary" :to="rota"> Detalhes </q-btn>
    </q-card-actions>
  </q-card>
</template>
