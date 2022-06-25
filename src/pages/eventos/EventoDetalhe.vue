<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUsuarioStore } from '../../stores/usuario';
import ShareButton from 'src/components/ShareButton.vue';
import { dataLegivel, adicionarEventoAgenda } from 'src/utils';
import Usuario from 'src/models/domain/usuarios/usuario';
import Evento from 'src/models/domain/eventos/evento';
import { useEventoStore } from 'src/stores/evento';
import dayjs from 'dayjs';
import { assertBinary } from '@babel/types';

const eventoStore = useEventoStore();
const usuarioStore = useUsuarioStore();
const Route = useRoute();
const $q = useQuasar();

const evento = ref<Evento>();
const usuarioCriador = ref<Usuario>();
const usuarioEditor = ref<Usuario>();
const carregando = ref<boolean>(false);
const textoCompartilhamento = ref('');

const editadoEm = computed<string | null>(() => {
  return dataLegivel(evento.value.getEditadoEm());
});

const criadoEm = computed<string | null>(() => {
  return dataLegivel(evento.value.getCriadoEm());
});

const data = computed<string | null>(() => {
  return dayjs(evento.value.getData()).format('DD/MM/YYYY - HH:mm');
});

const descricao = computed<string>(() => {
  return evento.value.getDescricao();
});

const titulo = computed<string>(() => {
  return evento.value.getTitulo();
});

const nomeUsuarioCriador = computed<string>(() => {
  return usuarioCriador.value?.getNome() ?? 'Usuário não identificado';
});

const nomeUsuarioEditor = computed<string>(() => {
  return usuarioEditor.value?.getNome() ?? 'Usuário não identificado';
});

onMounted(async () => {
  try {
    carregando.value = true;

    if (!eventoStore.eventoSelecionado) {
      const uid = Route.params.uid as string;
      await eventoStore.getEvento(uid);
    }

    evento.value = eventoStore.eventoSelecionado as Evento;

    usuarioCriador.value = await usuarioStore.getUsuario(
      evento.value.getCriadoPor()
    );

    if (evento.value.getEditadoEm()) {
      usuarioEditor.value = await usuarioStore.getUsuario(
        evento.value.getEditadoPor()
      );
    }

    textoCompartilhamento.value = `${evento.value.getTitulo()} ${
      window.location.href
    }`;
  } catch (e) {
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

const abrirAgenda = (evento: Evento) => {
  const link = adicionarEventoAgenda(evento);
  window.open(link, '_blank').focus();
};
</script>

<template>
  <div class="row flex-center">
    <q-spinner-hourglass
      v-if="carregando || !evento?.getId()"
      color="primary"
      size="2em"
    />
    <div v-else>
      <q-breadcrumbs class="q-mx-md-xl q-my-lg">
        <q-breadcrumbs-el label="Início" icon="o_home" to="/" />
        <q-breadcrumbs-el label="Eventos" icon="o_campaign" to="/eventos" />
      </q-breadcrumbs>
      <q-card
        class="q-pa-md q-pa-md-xl q-mx-md-xl q-my-md q-mt-lg"
        style="max-width: 950px"
      >
        <q-card-actions align="right">
          <q-chip
            outline
            color="primary"
            text-color="white"
            icon="event"
            clickable
            @click="abrirAgenda(evento)"
          >
            Adicionar ao calendário
          </q-chip>
          <q-space></q-space>
          <ShareButton :texto="textoCompartilhamento" />
        </q-card-actions>

        <q-card-section>
          <p class="text-overline">{{ data }}</p>
          <p class="text-h6 lt-md">{{ titulo }}</p>
          <p class="text-h4 gt-sm">{{ titulo }}</p>
          <p class="text-body2">
            <span>
              Escrito por {{ nomeUsuarioCriador }} &bull; escrito em
              {{ criadoEm }}
            </span>
            <br />
            <span v-if="editadoEm">
              Editado por {{ nomeUsuarioEditor }} &bull; editado em
              {{ editadoEm }}
            </span>
          </p>
        </q-card-section>

        <q-card-section>
          <div v-html="descricao"></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
