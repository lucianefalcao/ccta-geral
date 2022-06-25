<script setup lang="ts">
import MenuItemBotao from './MenuItemBotao.vue';

const menusItens = [
  { titulo: 'Notícias', icone: 'o_newspaper', rota: '/noticias' },
  { titulo: 'Eventos', icone: 'o_event', rota: '/eventos' },
  { titulo: 'Editais', icone: 'o_campaign', rota: '/editais' },
];
</script>

<template>
  <MenuItemBotao
    v-for="menu in menusItens"
    :key="menu.titulo"
    :titulo="menu.titulo"
    :icone="menu.icone"
    :rota="menu.rota"
  />
</template>
