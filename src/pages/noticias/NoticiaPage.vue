<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useNoticiaStore } from '../../stores/noticia';

const noticiaStore = useNoticiaStore();
const Route = useRoute();
const $q = useQuasar();

const noticia = ref(noticiaStore.noticiaSelecionada);
const carregando = ref<boolean>(false);

onMounted(() => {
  try {
    carregando.value = true;
    const uid = Route.params.uid as string;
    noticiaStore.getNoticia(uid);
  } catch (e: any) {
    $q.notify({
      color: 'negative',
      message:
        'Ocorreu um problema ao buscar a notícia. Por favor, atualize a página.',
      icon: 'o_report_problem',
      timeout: 5000,
      position: 'top',
    });
  } finally {
    carregando.value = false;
  }
});
</script>

<template>
  <div class="row flex-center">
    <q-spinner-hourglass v-if="carregando" color="primary" size="2em" />
    <q-card
      v-else
      class="q-pa-md q-pa-md-xl q-ma-md-xl"
      style="max-width: 950px"
    >
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
