<script setup lang="ts">
import { ref } from '@vue/runtime-core';
import Noticia from 'src/models/domain/Noticia';
import { lineClamp } from '../../utils';
import { useNoticiaStore } from '../../stores/noticia';
import { useRouter } from 'vue-router';

const noticiaStore = useNoticiaStore();
const Router = useRouter();

const noticias = ref<Noticia[]>([]);
const carregando = ref<boolean>(false);
const completa = ref<boolean>(false);

const goTo = (noticia: Noticia) => {
  noticiaStore.noticiaSelecionada = noticia;
  Router.push({
    path: `/noticias/${noticia.uid}`,
  });
};

const buscarNoticias = async (index: number, done: (stop: boolean) => void) => {
  try {
    carregando.value = true;
    const novasNoticias = await noticiaStore.getNoticiaPagination();
    if (novasNoticias.length > 0) {
      noticias.value.push(...novasNoticias);
      done(false);
    } else {
      completa.value = true;
      done(true);
    }
  } catch (e: any) {
    console.log(e);
  } finally {
    carregando.value = false;
  }
};
</script>

<template>
  <div class="row justify-center">
    <q-list class="column q-mb-sm">
      <q-infinite-scroll @load="buscarNoticias">
        <q-item v-for="noticia in noticias" :key="noticia.uid">
          <q-card flat bordered class="cardNotica">
            <q-card-section horizontal>
              <q-card-section
                v-if="noticia.imgSrc"
                class="col-5 flex items-center gt-sm"
              >
                <q-img class="rounded-borders" :src="noticia.imgSrc" />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-h6 text-justify q-mt-sm q-mb-xs">
                  {{ noticia.titulo }}
                </div>
                <div
                  class="text-caption text-grey"
                  v-html="lineClamp(noticia.texto)"
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
