<script setup lang="ts">
import CardNoticia from './CardNoticia.vue';
import ErroBanner from '../ErroBanner.vue';
import { onMounted, ref } from '@vue/runtime-core';
import Noticia from '../../models/domain/Noticia';
import { useNoticiaStore } from '../../stores/noticia';

type NoticiaExibicao = Noticia & { rota: string };

const noticiaStore = useNoticiaStore();

const noticias = ref<NoticiaExibicao[]>([]);
const carregando = ref<boolean>(false);
const mensagemErro = ref<string>('');

onMounted(async () => {
  try {
    mensagemErro.value = '';
    carregando.value = true;

    const dadosNoticias = await noticiaStore.getNoticias(3);
    dadosNoticias.forEach((noticia) => {
      noticias.value.push({ ...noticia, rota: '#' });
    });
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
  <CardNoticia
    v-else
    v-for="noticia in noticias"
    :key="noticia.titulo"
    :titulo="noticia.titulo"
    :texto="noticia.texto"
    :img-src="noticia.imgSrc"
    :data="noticia.data"
    :rota="noticia.rota"
  />
</template>
