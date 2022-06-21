<script setup lang="ts">
import { ref } from '@vue/runtime-core';
import Noticia from 'src/models/domain/noticias/noticia';
import { lineClamp } from '../../utils';
import { useNoticiaStore } from '../../stores/noticia';
import { useRouter } from 'vue-router';
import ErroBanner from '../../components/ErroBanner.vue';

const noticiaStore = useNoticiaStore();
const Router = useRouter();

const noticias = ref<Noticia[]>([]);
const carregando = ref<boolean>(false);
const mensagemErro = ref<string>('');

const goTo = (noticia: Noticia) => {
  noticiaStore.noticiaSelecionada = noticia;
  Router.push({
    path: `/noticias/${noticia.getId()}`,
  });
};

const buscarNoticias = async (index: number, done: (stop: boolean) => void) => {
  try {
    carregando.value = true;
    const novasNoticias = await noticiaStore.getNoticiaPaginacao();
    if (novasNoticias.length > 0) {
      noticias.value.push(...novasNoticias);
      done(false);
    } else {
      done(true);
    }
  } catch (e: any) {
    console.log(e);
    mensagemErro.value =
      'Ocorreu um erro ao buscar as notícias, por favor atualize a página.';
  } finally {
    carregando.value = false;
  }
};
</script>

<template>
  <div class="row justify-center">
    <ErroBanner v-if="!carregando && mensagemErro" :mensagem="mensagemErro" />

    <q-list v-else class="column q-mb-sm">
      <q-infinite-scroll @load="buscarNoticias">
        <q-item v-for="noticia in noticias" :key="noticia.getId()">
          <q-card flat bordered class="cardNotica">
            <q-card-section horizontal>
              <q-card-section
                v-if="noticia.getCapa()"
                class="col-5 flex items-center gt-sm"
              >
                <q-img class="rounded-borders" :src="noticia.getCapa()" />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-h6 text-justify q-mt-sm q-mb-xs">
                  {{ noticia.getTitulo() }}
                </div>
                <div
                  class="text-caption text-grey"
                  v-html="lineClamp(noticia.getTexto())"
                ></div>
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn @click="goTo(noticia)" flat color="primary">
                detalhes
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-item>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-hourglass color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-list>
  </div>
</template>
