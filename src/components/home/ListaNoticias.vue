<script setup lang="ts">
import CardNoticia from './CardNoticia.vue';
import { onMounted, ref } from '@vue/runtime-core';
import Noticia from '../../models/domain/Noticia';
import { useNoticiaStore } from '../../stores/noticia';

type NoticiaExibicao = Noticia & { rota: string };

const noticiaStore = useNoticiaStore();

const noticias = ref<NoticiaExibicao[]>([]);

onMounted(async () => {
  const dadosNoticias = await noticiaStore.getNoticias(3);

  dadosNoticias.forEach((noticia) => {
    noticias.value.push({ ...noticia, rota: '#' });
  });
});
</script>

<template>
  <CardNoticia
    v-for="noticia in noticias"
    :key="noticia.titulo"
    :titulo="noticia.titulo"
    :texto="noticia.texto"
    :img-src="noticia.imgSrc"
    :data="noticia.data"
    :rota="noticia.rota"
  />
</template>
