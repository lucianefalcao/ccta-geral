<script setup lang="ts">
import { lineClamp } from '../../utils'

defineProps<{
  titulo: string,
  data: string,
  hora: string,
  descricao: string,
  rota: string
}>()

</script>

<template>
  <q-card
    class="col-md-3"
    flat
    bordered
    style="max-width: 300px"
  >
    <q-card-section class="q-pt-xs">
      <div class="text-overline">{{ data }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ titulo }}</div>
      <div v-html="lineClamp(descricao)" class="text-caption text-grey"></div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn disable flat round icon="o_insert_invitation" >
        {{ hora }}
      </q-btn>
      <q-btn flat color="primary" :to="rota">
        Detalhes
      </q-btn>
    </q-card-actions>
  </q-card>
</template>