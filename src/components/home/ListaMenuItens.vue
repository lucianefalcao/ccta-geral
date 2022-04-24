<script setup lang="ts">
import MenuItemBotao from './MenuItemBotao.vue';

const menusItens = [
  { titulo: 'Sobre', icone: 'o_info', rota: '#' },
  { titulo: 'Notícias', icone: 'o_newspaper', rota: '#' },
  { titulo: 'Eventos', icone: 'o_event', rota: '#' },
  { titulo: 'Editais', icone: 'o_campaign', rota: '#' }
]

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