<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import EssentialLink from 'components/EssentialLink.vue';

const $q = useQuasar();
const linksEssenciais = [
  {
    title: 'Notícias',
    caption: 'Confira as novidades do centro',
    icon: 'o_newspaper',
    link: '/noticias',
  },
  {
    title: 'Eventos',
    caption: 'Veja os eventos do mês',
    icon: 'o_event',
    link: '/eventos',
  },
  {
    title: 'Editais',
    caption: 'Confira as oportunidades do centro',
    icon: 'o_campaign',
    link: '/editais',
  },
  {
    title: 'Atendimento',
    caption: 'Tire suas dúvidas',
    icon: 'o_chat',
    link: '/atendimento',
  },
  {
    title: 'Cursos',
    caption: 'Veja os cursos do nosso centro',
    icon: 'o_school',
    link: '/cursos',
  },
];

const drawerAberto = ref(false);
const toggleDrawer = () => {
  drawerAberto.value = !drawerAberto.value;
};

onMounted(() => {
  if ($q.platform.is.desktop) {
    drawerAberto.value = true;
    return;
  }
});
</script>

<template>
  <q-layout view="hHh Lpr fff">
    <q-header reveal>
      <q-toolbar class="bg-white text-primary">
        <q-btn
          flat
          dense
          round
          icon="o_menu"
          aria-label="Menu"
          class="lt-md"
          @click="toggleDrawer"
        />

        <q-toolbar-title class="q-pa-lg">
          <a href="/" class="text-primary text-weight-bold">
            <q-avatar>
              <img src="../assets/logo.svg" alt="Logo" />
            </q-avatar>

            CCTA
          </a>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerAberto">
      <q-list>
        <div class="row justify-between items-center">
          <q-item-label header> Menu </q-item-label>

          <q-btn
            flat
            icon-right="o_close"
            class="q-pr-lg lt-md"
            @click="toggleDrawer"
          />
        </div>

        <EssentialLink
          v-for="link in linksEssenciais"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="q-px-md-xl">
      <router-view />
    </q-page-container>

    <q-footer class="col q-pa-md text-right">
      <p class="text-weight-bold q-mb-none">
        Universidade Federal da Paraíba - UFPB
      </p>
      <p class="q-mb-none">
        secretariaccta@ccta.ufpb.br / ascimcctaufpb@gmail.com
      </p>
      <p class="q-mb-none">
        Campus I - Cidade Universitária - João Pessoa - PB - Brasil
      </p>
      <p class="q-mb-none">CEP: 58051-900</p>
    </q-footer>
  </q-layout>
</template>
