<script setup lang="ts">
import Noticia from 'src/models/domain/noticias/noticia';
import { useRouter } from 'vue-router';
import { lineClamp, dataLegivel } from '../../utils';
import { useNoticiaStore } from '../../stores/noticia';
import { computed } from '@vue/runtime-core';

const noticiaStore = useNoticiaStore();

const props = defineProps<{
  noticia: Noticia;
}>();

const Router = useRouter();

const publicadoEm = computed<string | null>(() => {
  return dataLegivel(props.noticia.getPublicadoEm());
});

const texto = computed<string>(() => {
  return lineClamp(props.noticia.getTexto());
});

const goTo = () => {
  noticiaStore.noticiaSelecionada = props.noticia;
  Router.push({
    path: `/noticias/${props.noticia.getId()}`,
  });
};
</script>

<template>
  <q-card tag="div" href="#" class="text-white col-md-3">
    <q-img
      v-if="noticia.getCapa()"
      :src="noticia.getCapa()"
      alt="Imagem"
      class="q-pa-none"
      fit="cover"
      :ratio="16 / 9"
    />
    <q-card-section class="bg-primary">
      <div class="text-weight-bold">{{ noticia.getTitulo() }}</div>
      <div class="text-body textSubtitle text-white">
        Publicado em {{ publicadoEm }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none bg-primary">
      <div v-html="texto"></div>
    </q-card-section>

    <q-card-actions align="right" class="bg-primary q-pt-none">
      <q-btn flat @click="goTo">Detalhes</q-btn>
    </q-card-actions>
  </q-card>
</template>
