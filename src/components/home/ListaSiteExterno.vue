<script setup lang="ts">
import SiteExterno from './SiteExterno.vue'
import {
  ArchiveIcon,
  BookOpenIcon,
  PhotographIcon,
  MusicNoteIcon
} from '@heroicons/vue/outline'

const sites = [
  {titulo: 'Biblioteca CCTA', link: 'http://www.ccta.ufpb.br/bsccta', icone: ArchiveIcon},
  {titulo: 'Editora CCTA', link: 'http://www.ccta.ufpb.br/editora', icone: BookOpenIcon},
  {titulo: 'Pinacoteca CCTA', link: 'http://www.ccta.ufpb.br/pinacoteca', icone: PhotographIcon},
  {titulo: 'Webrádio Porto do Capim', link: 'http://www.ccta.ufpb.br/bsccta', icone: MusicNoteIcon},
];

</script>

<template>
  <div v-for="site in sites" :key="site.titulo">
    <SiteExterno :url="site.link" :titulo="site.titulo">
      <component :is="site.icone" class="h-10"></component>
    </SiteExterno>
  </div>
</template>