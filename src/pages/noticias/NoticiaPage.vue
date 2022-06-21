<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useNoticiaStore } from '../../stores/noticia';
import ShareButton from 'src/components/ShareButton.vue';
import { dataLegivel } from 'src/utils';

const noticiaStore = useNoticiaStore();
const Route = useRoute();
const $q = useQuasar();

const noticia = ref(noticiaStore.noticiaSelecionada);
const carregando = ref<boolean>(false);
const textoCompartilhamento = ref('');

const publicadoEm = computed<string | null>(() => {
  return dataLegivel(noticia.value.getPublicadoEm());
});

onMounted(async () => {
  try {
    carregando.value = true;
    const uid = Route.params.uid as string;
    await noticiaStore.getNoticia(uid);

    textoCompartilhamento.value = `${noticiaStore.noticiaSelecionada.getTitulo()} ${
      window.location.href
    }`;
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
      v-if="carregando || !noticia.getId()"
      color="primary"
      size="2em"
    />
    <div v-else>
      <q-breadcrumbs class="q-mx-md-xl">
        <q-breadcrumbs-el label="Início" icon="o_home" to="/" />
        <q-breadcrumbs-el label="Notícias" icon="o_newspaper" to="/noticias" />
      </q-breadcrumbs>
      <q-card
        class="q-pa-md q-pa-md-xl q-mx-md-xl q-my-md-lg"
        style="max-width: 950px"
      >
        <q-card-actions align="right">
          <ShareButton :texto="textoCompartilhamento" />
        </q-card-actions>
        <q-card-section class="row flex-center">
          <q-img
            v-if="noticia.getCapa()"
            :src="noticia.getCapa()"
            fit="contain"
            style="max-height: 300px; max-width: 600px"
            class="col"
          ></q-img>
        </q-card-section>

        <q-card-section>
          <p class="text-h6 lt-md">{{ noticia?.getTitulo() }}</p>
          <p class="text-h4 gt-sm">{{ noticia?.getTitulo() }}</p>
          <p class="text-body2">
            Escrito por Fulano &bull; última atualização em {{ publicadoEm }}
          </p>
        </q-card-section>

        <q-card-section>
          <div v-html="noticia.getTexto()"></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
