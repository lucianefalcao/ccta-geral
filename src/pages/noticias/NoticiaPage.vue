<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import Noticia from 'src/models/firebase/Noticia';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps<{
  noticia: Noticia;
}>();

onMounted(() => {
  console.log(route.params, props.noticia);
});
</script>

<template>
  <q-card> oi </q-card>
</template>
