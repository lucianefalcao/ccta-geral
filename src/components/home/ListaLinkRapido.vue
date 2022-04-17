<script setup lang="ts">
import LinkRapido from './LinkRapido.vue'
import {
  InformationCircleIcon,
  NewspaperIcon,
  DocumentTextIcon,
  CalendarIcon
} from '@heroicons/vue/outline'

const links = [
  {titulo: 'Sobre', icone: InformationCircleIcon},
  {titulo: 'Notícias', icone: NewspaperIcon},
  {titulo: 'Editais', icone: DocumentTextIcon},
  {titulo: 'Eventos', icone: CalendarIcon},
];

</script>

<template>

  <div v-for="link in links" :key="link.titulo" class="grid grid-cols-2 gap-4 place-content-center mt-5 md:flex md:flex-row md:justify-start md:mt-8">
    <LinkRapido>
      <template #icone>
        <component :is="link.icone" class="h-10"></component>
      </template>
      <template #titulo>
        {{ link.titulo }}
      </template>
    </LinkRapido>
  </div>
</template>