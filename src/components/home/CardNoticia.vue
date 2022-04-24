<script setup lang="ts">
import { lineClamp } from '../../utils'

defineProps<{
  imgSrc: string,
  titulo: string,
  data: string,
  texto: string,
  rota: string
}>()

</script>

<template>
  <q-card
    tag="div"
    href="#"
    class="text-white col-md-3"
  >
    <q-img src="https://via.placeholder.com/600x300" alt="Imagem" class="q-pa-none" />
    <q-card-section class="bg-primary">
      <div class="text-weight-bold"> {{ titulo }} </div>
      <div class="text-body textSubtitle text-white">Publicado em {{ data }} </div>
    </q-card-section>

    <q-card-section class="q-pt-none bg-primary">
      <div v-html="lineClamp(texto)"></div>
    </q-card-section>

    <q-card-actions align="right" class="bg-primary q-pt-none">
      <q-btn flat :to="rota">Detalhes</q-btn>
    </q-card-actions>
  </q-card>
</template>