<script setup lang="ts">

defineProps<{
  titulo: string,
  icone: string
  rota: string
}>()

</script>

<template>
  <q-btn
    stack
    color="primary"
    class="col-5 col-md-4 col-lg-2"
    :to="rota"
  >
    <q-icon :name="icone" size="md"></q-icon>
    <p class="q-mb-none"> {{ titulo }} </p>
  </q-btn>
</template>