<script setup lang="ts">
import ListaSitesExternos from 'src/components/home/ListaSitesExternos.vue';
import ListaMenuItens from 'src/components/home/ListaMenuItens.vue';
import ListaNoticias from 'src/components/home/ListaNoticias.vue';
import ListaEventos from 'src/components/home/ListaEventos.vue';
import { useCentroStore } from 'stores/centro';
import { onMounted, ref } from '@vue/runtime-core';

const centroStore = useCentroStore();
const descricao = ref<string>('');
const carregando = ref<boolean>(false);

const googleMapApi = process.env.API_KEY_MAPS;

onMounted(async () => {
  try {
    carregando.value = true;
    await centroStore.getDescricao();
    descricao.value = centroStore.descricao;
  } catch (e) {
    descricao.value = 'Aqui você encontra todas as notícias do CCTA!';
  } finally {
    carregando.value = false;
  }
});
</script>

<template>
  <q-circular-progress
    v-if="carregando"
    indeterminate
    size="sm"
    color="primary"
    class="q-ma-md"
  />
  <q-page v-else>
    <section
      class="q-mx-lg q-mt-xl q-mx-md-xl row-md justify-between q-gutter-sm"
    >
      <div class="col-md-5">
        <p class="text-h4 text-weight-bold">
          Seja bem-vindo ao Portal CCTA&hellip;
        </p>
        <p>
          {{ descricao }}
        </p>

        <div class="row flex-center q-gutter-sm q-mt-sm">
          <ListaMenuItens />
        </div>
      </div>

      <div class="q-mt-lg q-mt-md-none col-md-6">
        <q-img
          src="../assets/undraw_graduation_re_gthn.svg"
          alt="Imagem principal do site"
        ></q-img>
      </div>
    </section>

    <!-- Acesso externo -->

    <section class="q-mx-lg q-mt-xl q-pt-xl q-mx-md-xl">
      <p class="text-h6 textSection q-mb-none text-weight-bold">
        Sites externos
      </p>
      <p class="text-subtitle-1 textSubtitle">Conheça os nossos outros sites</p>

      <div
        class="row flex-center q-gutter-sm q-gutter-md-lg q-mt-sm q-pt-md-lg"
      >
        <ListaSitesExternos />
      </div>
    </section>

    <!-- Notícias -->

    <section class="q-mx-lg q-mt-xl q-pt-xl q-mx-md-xl">
      <span class="row items-center justify-between">
        <div class="col-6">
          <p class="text-h6 textSection q-mb-none text-weight-bold">Notícias</p>
          <p class="text-subtitle-1 textSubtitle">Confira as notícias</p>
        </div>
        <a href="/noticias" class="text-blue-6">Ver mais</a>
      </span>

      <div class="row flex-center q-gutter-md q-mt-sm q-pt-md-lg">
        <ListaNoticias />
      </div>
    </section>

    <!-- Eventos -->

    <section class="q-mx-lg q-mt-xl q-pt-xl q-mx-md-xl q-mb-xl">
      <span class="row items-center justify-between">
        <div class="col-6">
          <p class="text-h6 textSection q-mb-none text-weight-bold">Eventos</p>
          <p class="text-subtitle-1 textSubtitle">Confira os nossos eventos</p>
        </div>
        <a href="/eventos" class="text-blue-6">Ver mais</a>
      </span>

      <div class="row flex-center q-gutter-md q-mt-sm q-pt-md-lg">
        <ListaEventos />
      </div>
    </section>

    <section class="row flex-center q-my-lg">
      <iframe
        width="100%"
        height="250"
        frameborder="0"
        style="border: 0"
        referrerpolicy="no-referrer-when-downgrade"
        :src="`https://www.google.com/maps/embed/v1/place?key=${googleMapApi}&q=Centro+De+Comunicação,+Turismo+e+Artes+-+CCTA/UFPB`"
        allowfullscreen
      >
      </iframe>
    </section>
  </q-page>
</template>
