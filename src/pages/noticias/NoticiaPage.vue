<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useNoticiaStore } from '../../stores/noticia';
import { useUsuarioStore } from '../../stores/usuario';
import ShareButton from 'src/components/ShareButton.vue';
import { dataLegivel } from 'src/utils';
import Noticia from 'src/models/domain/noticias/noticia';
import Usuario from 'src/models/domain/usuarios/usuario';

const noticiaStore = useNoticiaStore();
const usuarioStore = useUsuarioStore();
const Route = useRoute();
const $q = useQuasar();

const noticia = ref<Noticia>();
const usuarioCriador = ref<Usuario>();
const usuarioEditor = ref<Usuario>();
const carregando = ref<boolean>(false);
const textoCompartilhamento = ref('');

const publicadoEm = computed<string | null>(() => {
  return dataLegivel(noticia.value.getPublicadoEm());
});

const editadoEm = computed<string | null>(() => {
  return dataLegivel(noticia.value.getEditadoEm());
});

const texto = computed<string>(() => {
  return noticia.value.getTexto();
});

const titulo = computed<string>(() => {
  return noticia.value.getTitulo();
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

    if (!noticiaStore.noticiaSelecionada) {
      const uid = Route.params.uid as string;
      await noticiaStore.getNoticia(uid);
    }

    noticia.value = noticiaStore.noticiaSelecionada as Noticia;

    usuarioCriador.value = await usuarioStore.getUsuario(
      noticia.value.getCriadoPor()
    );

    if (noticia.value.getEditadoEm()) {
      usuarioEditor.value = await usuarioStore.getUsuario(
        noticia.value.getEditadoPor()
      );
    }

    textoCompartilhamento.value = `${noticia.value.getTitulo()} ${
      window.location.href
    }`;
  } catch (e: any) {
    console.log(e);
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
      v-if="carregando || !noticia?.getId()"
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
          <p class="text-h6 lt-md">{{ titulo }}</p>
          <p class="text-h4 gt-sm">{{ titulo }}</p>
          <p class="text-body2">
            <span>
              Escrito por {{ nomeUsuarioCriador }} &bull; escrito em
              {{ publicadoEm }}
            </span>
            <br />
            <span v-if="editadoEm">
              Editado por {{ nomeUsuarioEditor }} &bull; editado em
              {{ editadoEm }}
            </span>
          </p>
        </q-card-section>

        <q-card-section>
          <div v-html="texto"></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
