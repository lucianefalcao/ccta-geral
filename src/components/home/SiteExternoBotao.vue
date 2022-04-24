<script setup lang="ts">

defineProps<{
  titulo: string,
  icone: string,
  url: string
}>()

</script>

<template>
  <q-btn
    :href="url"
    stack
    outline
    color="primary"
    class="col-6 col-sm-5 col-md-2 q-py-md q-px-sm"
  >
    <q-icon :name="icone" size="md"></q-icon>
    <p class="q-mb-none"> {{ titulo }} </p>
  </q-btn>
</template>