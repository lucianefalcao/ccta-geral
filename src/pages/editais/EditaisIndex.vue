<script setup lang="ts">
import { computed, ref } from '@vue/runtime-core';
import ErroBanner from '../../components/ErroBanner.vue';
import { useQuasar } from 'quasar';
import { useEditalStore } from 'src/stores/edital';
import Edital from 'src/models/domain/editais/edital';
import { useUsuarioStore } from 'src/stores/usuario';
import dayjs from 'dayjs';

const editalStore = useEditalStore();
const usuarioStore = useUsuarioStore();
const $q = useQuasar();

const espacamento = computed(() => {
  return $q.screen.name === 'xs' || $q.screen.name === 'sm'
    ? 'q-mt-xl'
    : 'q-mt-lg';
});

const editais = ref<Edital[]>([]);
const carregando = ref<boolean>(false);
const mensagemErro = ref<string>('');

const buscarEditais = async (index: number, done: (stop: boolean) => void) => {
  try {
    carregando.value = true;
    const novosEditais = await editalStore.getEditaisPaginacao();
    if (novosEditais.length > 0) {
      editais.value.push(...novosEditais);
      done(false);
    } else {
      done(true);
    }
  } catch (e) {
    mensagemErro.value =
      'Ocorreu um erro ao buscar as notícias, por favor atualize a página.';
  } finally {
    carregando.value = false;
  }
};

const buscarCriador = async (edital: Edital) => {
  const usuario = await usuarioStore.getUsuario(edital.getCriadoPor());
  return usuario?.getNome() ?? 'usuário não identificado';
};

const getData = (edital: Edital) =>
  dayjs(edital.getCriadoEm()).format('DD/MM/YYYY');
</script>

<template>
  <div class="row justify-center">
    <ErroBanner v-if="!carregando && mensagemErro" :mensagem="mensagemErro" />

    <div v-else :class="espacamento">
      <q-breadcrumbs v-if="!carregando" class="q-mx-md">
        <q-breadcrumbs-el label="Início" icon="o_home" to="/" />
      </q-breadcrumbs>

      <q-list separator class="column q-mb-sm q-mt-lg">
        <q-infinite-scroll @load="buscarEditais">
          <q-item-label header>Editais</q-item-label>
          <q-item v-for="edital in editais" :key="edital.getId()">
            <q-item-section avatar top>
              <q-icon name="o_cloud_download" color="secundary" size="20px" />
            </q-item-section>
            <q-item-section top>
              <q-item-label class="cursor-pointer" lines="3">
                <a
                  :href="edital.getDocumento()"
                  target="_blank"
                  class="text-primary text-weight-medium"
                  >{{ edital.getTitulo() }}</a
                >
              </q-item-label>
              <q-item-label caption lines="1">
                Criado por {{ edital.getCriadoPor() }} em
                {{ getData(edital) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-hourglass color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-list>
    </div>
  </div>
</template>
