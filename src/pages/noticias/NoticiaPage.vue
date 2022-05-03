<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useNoticiaStore } from '../../stores/noticia';

const noticiaStore = useNoticiaStore();
const Route = useRoute();

const noticia = ref(noticiaStore.noticiaSelecionada);

onMounted(() => {
  const uid = Route.params.uid as string;
  noticiaStore.getNoticia(uid);
});
</script>

<template>
  <div class="row flex-center">
    <q-card class="q-pa-md q-pa-md-xl q-ma-md-xl" style="max-width: 950px">
      <q-card-section class="row flex-center">
        <q-img
          :src="noticia.imgSrc"
          fit="contain"
          style="max-height: 300px; max-width: 600px"
          class="col"
        ></q-img>
      </q-card-section>

      <q-card-section>
        <p class="text-h4">{{ noticia?.titulo }}</p>
        <p class="text-body2">
          Escrito por Fulano &bull; última atualização em {{ noticia.data }}
        </p>
      </q-card-section>

      <q-card-section>
        <div v-html="noticia.texto"></div>
      </q-card-section>
    </q-card>
  </div>
</template>
