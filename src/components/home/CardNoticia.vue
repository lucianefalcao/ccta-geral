<script setup lang="ts">
import Noticia from 'src/models/domain/Noticia';
import { useRouter } from 'vue-router';
import { lineClamp } from '../../utils';
import { useNoticiaStore } from '../../stores/noticia';

const noticiaStore = useNoticiaStore();

const props = defineProps<{
  noticia: Noticia;
}>();

const Router = useRouter();

const goTo = () => {
  noticiaStore.noticiaSelecionada = props.noticia;
  Router.push({
    path: `/noticias/${props.noticia.uid}`,
  });
};
</script>

<template>
  <q-card tag="div" href="#" class="text-white col-md-3">
    <q-img
      v-if="noticia.imgSrc"
      :src="noticia.imgSrc"
      alt="Imagem"
      class="q-pa-none"
      fit="cover"
      :ratio="16 / 9"
    />
    <q-card-section class="bg-primary">
      <div class="text-weight-bold">{{ noticia.titulo }}</div>
      <div class="text-body textSubtitle text-white">
        Publicado em {{ noticia.data }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none bg-primary">
      <div v-html="lineClamp(noticia.texto)"></div>
    </q-card-section>

    <q-card-actions align="right" class="bg-primary q-pt-none">
      <q-btn flat @click="goTo">Detalhes</q-btn>
    </q-card-actions>
  </q-card>
</template>
