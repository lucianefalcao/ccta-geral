<script setup lang="ts">
import SiteExternoBotao from './SiteExternoBotao.vue';

const sites = [
  {titulo: 'Biblioteca CCTA', link: 'http://www.ccta.ufpb.br/bsccta', icone: 'o_inventory_2'},
  {titulo: 'Editora CCTA', link: 'http://www.ccta.ufpb.br/editora', icone: 'o_menu_book'},
  {titulo: 'Pinacoteca CCTA', link: 'http://www.ccta.ufpb.br/pinacoteca', icone: 'o_photo'},
  {titulo: 'Webrádio Porto do Capim', link: 'http://www.ccta.ufpb.br/bsccta', icone: 'o_radio'},
];

</script>

<template>
  <SiteExternoBotao
    v-for="site in sites"
    :key="site.titulo"
    :titulo="site.titulo"
    :icone="site.icone"
    :url="site.link"
  />
</template>