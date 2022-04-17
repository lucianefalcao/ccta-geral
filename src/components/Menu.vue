<script setup lang="ts">
import { ref } from "@vue/reactivity"
import { MenuIcon, XIcon } from '@heroicons/vue/outline'


const menus = [
  { title: 'Início', link: '/' },
  { title: 'Sobre', link: '#' },
  { title: 'Notícias', link: '#' },
  { title: 'Eventos', link: '#' },
  { title: 'Editais', link: '#' },
  { title: 'Atendimento', link: '#' },
]

const isMenuOpen = ref(false)

</script>

<template>
  <div class="bg-white max-w-full shadow py-4 px-4 flex items-center justify-between md:px-20">

    <a href="/" class="cursor-pointer">
        <img src="../assets/logo.svg" alt="Logo" class="h-12">
    </a>

    <button
      type="button"
      class="hover:text-red-500 md:hidden"
      @click="isMenuOpen = !isMenuOpen"
    >
      <MenuIcon v-if="!isMenuOpen" class="h-6 fill-current" />
      <XIcon v-else class="h-6" />
    </button>

    <ul
      class="px-4 pb-10 absolute top-20 bg-white w-full h-full duration-700 ease-in md:flex md:items-center md:static md:pb-0 md:px-0 md:space-x-5 md:justify-end"
      :class="[isMenuOpen ? 'left-0' : 'left-[-100%]']"
    >
      <li v-for="menu in menus" :key="menu.title" class="my-6 md:mx-4 md:my-0">
        <a :href="menu.link" class="text-xl font-semibold hover:text-red-500">{{menu.title}}</a>
      </li>
    </ul>
  </div>
</template>

