<script setup lang="ts">
import { onMounted, ref } from '@vue/runtime-core';
import Evento from 'src/models/domain/eventos/evento';
import { useEventoStore } from 'src/stores/evento';
import CardEvento from '../../components/home/CardEvento.vue';
import ErroBanner from '../../components/ErroBanner.vue';
import { useQuasar } from 'quasar';

const eventoStore = useEventoStore();
const $q = useQuasar();

const eventos = ref<Evento[]>();
const carregando = ref<boolean>(false);
const mensagemErro = ref<string>('');

onMounted(async () => {
  try {
    mensagemErro.value = '';
    carregando.value = true;
    eventos.value = await eventoStore.getEventos(40);
  } catch (e) {
    mensagemErro.value =
      'Ocorreu um erro ao buscar as notícias, por favor atualize a página.';
  } finally {
    carregando.value = false;
  }
});
</script>

<template>
  <div class="row flex-center">
    <ErroBanner v-if="!carregando && mensagemErro" :mensagem="mensagemErro" />
    <div v-else>
      <q-breadcrumbs v-if="!carregando" class="q-mt-lg">
        <q-breadcrumbs-el label="Início" icon="o_home" to="/" />
      </q-breadcrumbs>
      <p v-if="$q.screen.gt.sm" class="text-h4 q-mt-lg">Próximos Eventos</p>
      <p v-else class="text-h6 q-mt-lg">Próximos Eventos</p>
      <q-list class="column q-mb-sm q-mt-lg">
        <q-item v-for="evento in eventos" :key="evento.getId()">
          <CardEvento :evento="evento"></CardEvento>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
