<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useNoticiaStore } from '../../stores/noticia';
import ShareButton from 'src/components/ShareButton.vue';

const noticiaStore = useNoticiaStore();
const Route = useRoute();
const $q = useQuasar();

const noticia = ref(noticiaStore.noticiaSelecionada);
const carregando = ref<boolean>(false);
const textoCompartilhamento = ref('');

onMounted(async () => {
  try {
    carregando.value = true;
    const uid = Route.params.uid as string;
    await noticiaStore.getNoticia(uid);

    textoCompartilhamento.value = `${noticiaStore.noticiaSelecionada.titulo} ${window.location.href}`;
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
    <q-spinner-hourglass
      v-if="carregando || !noticia.uid"
      color="primary"
      size="2em"
    />
    <q-card
      v-else
      class="q-pa-md q-pa-md-xl q-ma-md-xl"
      style="max-width: 950px"
    >
      <q-card-actions align="right">
        <ShareButton :texto="textoCompartilhamento" />
      </q-card-actions>
      <q-card-section class="row flex-center">
        <q-img
          v-if="noticia.imgSrc"
          :src="noticia.imgSrc"
          fit="contain"
          style="max-height: 300px; max-width: 600px"
          class="col"
        ></q-img>
      </q-card-section>

      <q-card-section>
        <p class="text-h6 lt-md">{{ noticia?.titulo }}</p>
        <p class="text-h4 gt-sm">{{ noticia?.titulo }}</p>
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
