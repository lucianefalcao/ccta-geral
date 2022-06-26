<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { useQuasar } from 'quasar';
import Curso, {
  CursoTipo,
  CursoSubTipoGraduacao,
  CursoSubTipoPosGraduacao,
  CursoTurno,
} from 'src/models/domain/cursos/curso';
import { useCursoStore } from 'src/stores/curso';
import ErroBanner from '../../components/ErroBanner.vue';

const cursoStore = useCursoStore();
const $q = useQuasar();

const cursos = ref<Curso[]>([]);
const carregando = ref<boolean>(false);
const mensagemErro = ref<string>('');

const tipos = {
  [CursoTipo.GRADUACAO]: 'Graduação',
  [CursoTipo.POS_GRADUACAO]: 'Pós-Graduação',
};

const subtipos = {
  [CursoSubTipoGraduacao.BACHARELADO]: 'Bacharelado',
  [CursoSubTipoGraduacao.LICENCIATURA]: 'Licenciatura',
  [CursoSubTipoGraduacao.TECNOLOGO]: 'Tecnológo',
  [CursoSubTipoPosGraduacao.DOUTURADO]: 'Doutorado',
  [CursoSubTipoPosGraduacao.ESPECIALIZACAO]: 'Especialização',
  [CursoSubTipoPosGraduacao.MBA]: 'MBA',
  [CursoSubTipoPosGraduacao.MESTRADO]: 'Mestrado',
  [CursoSubTipoPosGraduacao.POS_DOUTORADO]: 'Pós-doutorado',
};

const turnos = {
  [CursoTurno.INTEGRAL]: 'Integral',
  [CursoTurno.MANHA]: 'Manhã',
  [CursoTurno.NOITE]: 'Noite',
  [CursoTurno.TARDE]: 'Tarde',
};

const espacamento = computed(() => {
  return $q.screen.name === 'xs' || $q.screen.name === 'sm'
    ? 'q-mt-xl'
    : 'q-mt-lg';
});

const tipo = (curso: Curso) => tipos[curso.getTipo()];
const subtipo = (curso: Curso) => subtipos[curso.getSubtipo()];
const turno = (curso: Curso) => turnos[curso.getTurno()] ?? '';

const buscarCursos = async (index: number, done: (stop: boolean) => void) => {
  try {
    carregando.value = true;
    const novosCursos = await cursoStore.getCursosPaginacao();
    if (novosCursos.length > 0) {
      cursos.value.push(...novosCursos);
      done(false);
    } else {
      done(true);
    }
  } catch (e) {
    mensagemErro.value =
      'Ocorreu um erro ao buscar os cursos, por favor atualize a página.';
  } finally {
    carregando.value = false;
  }
};
</script>

<template>
  <div class="row flex-center">
    <ErroBanner v-if="!carregando && mensagemErro" :mensagem="mensagemErro" />
    <div v-else :class="espacamento">
      <q-breadcrumbs v-if="!carregando" class="q-mx-md">
        <q-breadcrumbs-el label="Início" icon="o_home" to="/" />
      </q-breadcrumbs>

      <q-list class="column q-mb-sm q-mt-lg">
        <q-infinite-scroll @load="buscarCursos">
          <q-expansion-item
            v-for="curso in cursos"
            :key="curso.getId()"
            popup
            style="max-width: 550px"
            class="q-mx-sm"
            :label="curso.getNome()"
            :caption="tipo(curso) + ' &bull; ' + subtipo(curso)"
            :header-style="{ color: '#ff5252' }"
            header-class="text-weight-medium"
          >
            <q-separator />
            <q-card>
              <q-card-section>
                <div class="text-overline textSection">
                  {{ curso.getPeriodos() }} períodos &bull;
                  {{ turno(curso) }}
                </div>
                {{ curso.getDescricao() }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
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

<style lang="scss" scoped>
.item {
  color: $secondary;
}
</style>
