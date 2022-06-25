<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import Evento from 'src/models/domain/eventos/evento';
import { useEventoStore } from 'src/stores/evento';
import CardEvento from './CardEvento.vue';
import ErroBanner from '../ErroBanner.vue';

const eventoStore = useEventoStore();
const eventos = ref<Evento[]>([]);
const carregando = ref<boolean>(false);
const mensagemErro = ref<string>('');

onMounted(async () => {
  try {
    mensagemErro.value = '';
    carregando.value = true;
    eventos.value = await eventoStore.getEventos();
  } catch (e: any) {
    mensagemErro.value =
      'Ocorreu um erro ao buscar as notícias, por favor atualize a página.';
  } finally {
    carregando.value = false;
  }
});
</script>

<template>
  <ErroBanner v-if="!carregando && mensagemErro" :mensagem="mensagemErro" />
  <q-circular-progress
    v-if="carregando"
    indeterminate
    size="sm"
    color="primary"
    class="q-ma-md"
  />
  <div v-if="!carregando && !mensagemErro && eventos.length === 0">
    <p>Nenhuma notícia cadastrada</p>
  </div>
  <CardEvento
    v-for="evento in eventos"
    :key="evento.getId()"
    :evento="evento"
  />
</template>
