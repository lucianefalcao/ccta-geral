<script setup lang="ts">
import CardEvento from './CardEvento.vue';

const eventos = [
  { titulo: 'Título 1', descricao: 'descrição 1', data: '21/04/2022', hora: '19:00', rota: '#' },
  { titulo: 'Título 2', descricao: 'descrição 2', data: '21/04/2022', hora: '19:00', rota: '#' },
  { titulo: 'Título 3', descricao: 'descrição 3', data: '21/04/2022', hora: '19:00', rota: '#' },
]

</script>

<template>
  <CardEvento
    v-for="evento in eventos"
    :key="evento.titulo"
    :titulo="evento.titulo"
    :descricao="evento.descricao"
    :rota="evento.rota"
    :data="evento.data"
    :hora="evento.hora"
  />
</template>