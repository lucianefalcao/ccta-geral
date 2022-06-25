<script setup lang="ts">
import CardNoticia from './CardNoticia.vue';
import ErroBanner from '../ErroBanner.vue';
import { onMounted, ref } from '@vue/runtime-core';
import Noticia from '../../models/domain/noticias/noticia';
import { useNoticiaStore } from '../../stores/noticia';

const noticiaStore = useNoticiaStore();

const noticias = ref<Noticia[]>([]);
const carregando = ref<boolean>(false);
const mensagemErro = ref<string>('');

onMounted(async () => {
  try {
    mensagemErro.value = '';
    carregando.value = true;
    noticias.value = await noticiaStore.getNoticias(3);
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
  <div v-if="!carregando && noticias.length === 0">
    <p>Nenhuma notícia cadastrada</p>
  </div>
  <CardNoticia
    v-else
    v-for="noticia in noticias"
    :key="noticia.getId()"
    :noticia="noticia"
  />
</template>
