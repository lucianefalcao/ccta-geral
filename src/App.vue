<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Menu from './components/Menu.vue'
import LinkRapido from './components/home/LinkRapido.vue'
import {
  InformationCircleIcon,
  NewspaperIcon,
  DocumentTextIcon,
  CalendarIcon,
  PaperClipIcon,
  ArrowRightIcon,
  ArchiveIcon,
  BookOpenIcon,
  PhotographIcon,
  MusicNoteIcon
} from '@heroicons/vue/outline'
</script>

<template>
  <header>
    <Menu></Menu>
  </header>

  <div class="mt-16 mx-4 md:mx-20 md:flex md:flex-row md:space-x-4">

    <div>
      <p class="text-3xl font-bold mt-8 md:text-4xl">Seja bem-vindo ao Portal CCTA&hellip;</p>

      <div class="text-sm mt-8 md:w-3/4 md:text-xl">
        <p>Oh yeah. It's the best part. It's crunchy, it's explosive, it's where the muffin breaks free of the pan and sort of does it's own thing. I'll tell you. That's a million dollor idea right there. Just sell the tops.</p>
      </div>
      
      <div class="grid grid-cols-2 gap-4 place-content-center mt-5 md:flex md:flex-row md:justify-start md:mt-8">
        <LinkRapido>
          <template #icone>
            <InformationCircleIcon class="h-10"/>
          </template>
          <template #titulo>
            Sobre
          </template>
        </LinkRapido>

        <LinkRapido>
          <template #icone>
            <NewspaperIcon class="h-10"/>
          </template>
          <template #titulo>
            Notícias
          </template>
        </LinkRapido>

        <LinkRapido>
          <template #icone>
            <DocumentTextIcon class="h-10"/>
          </template>
          <template #titulo>
            Editais
          </template>
        </LinkRapido>

        <LinkRapido>
          <template #icone>
            <CalendarIcon class="h-10"/>
          </template>
          <template #titulo>
            Eventos
          </template>
        </LinkRapido>
      </div>
    </div>

    <div class="mt-8 md:mt-0">
      <img src="https://via.placeholder.com/1200x600" alt="">
    </div>
</div>

  <!-- Acesso externo -->

  <div class="mt-16 mx-4 md:mx-20">
    <p class="text-xl text-gray-600 font-bold md:text-2xl">Sites externos</p>
    <p class="text-gray-400">Conheça os nossos outros sites</p>

    <div class="mt-8 grid space-y-8 place-content-center text-center md:mt-16 md:flex md:flex-row md:justify-center md:space-x-16 md:space-y-0">
      
      <a
        href="http://www.ccta.ufpb.br/bsccta"
        target="__blank"
        class="group ring-2 ring-red-500 rounded-lg hover:bg-red-600 hover:text-white hover:ring-white"
      >
        <div class="grid justify-items-center py-4 px-2">
          <p class="text-sm text-red-500 group-hover:text-white"> <ArchiveIcon class="h-10" /> </p>
          <p class="font-medium">Biblioteca CCTA</p>
        </div>
      </a>

      <a
        href="http://www.ccta.ufpb.br/editora"
        target="__blank"
        class="group ring-2 ring-red-500 rounded-lg hover:bg-red-600 hover:text-white hover:ring-white"
      >
        <div class="grid justify-items-center py-4 px-2">
          <p class="text-sm text-red-500 group-hover:text-white"> <BookOpenIcon class="h-10" /> </p>
          <p class="font-medium">Editora CCTA</p>
        </div>
      </a>

      <a
        href="http://www.ccta.ufpb.br/pinacoteca"
        target="__blank"
        class="group ring-2 ring-red-500 rounded-lg hover:bg-red-600 hover:text-white hover:ring-white"
      >
        <div class="grid justify-items-center py-4 px-2">
          <p class="text-sm text-red-500 group-hover:text-white"> <PhotographIcon class="h-10" /> </p>
          <p class="font-medium">Pinacoteca CCTA</p>
        </div>
      </a>

      <a
        href="http://www.radioportodocapim.ufpb.br/"
        target="__blank"
        class="group ring-2 ring-red-500 rounded-lg hover:bg-red-600 hover:text-white hover:ring-white"
      >
        <div class="grid justify-items-center py-4 px-2">
          <p class="text-sm text-red-500 group-hover:text-white"> <MusicNoteIcon class="h-10" /> </p>
          <p class="font-medium">Webrádio Porto do Capim</p>
        </div>
      </a>

    </div>
  </div>

  <!-- Notícias -->

  <div class="mt-16 mx-4 md:mt-20 md:mx-20">
    <span class="flex items-center justify-between">
      <div>
        <p class="text-xl text-gray-600 font-bold md:text-2xl">Notícias</p>
        <p class="text-gray-400">Confira as notícias</p>
      </div>
      <a href="#" class="text-sm text-sky-500 md:text-base">Ver mais</a>
    </span>

    <div class="mt-8 grid space-y-8 md:mt-16 md:flex md:flex-row md:justify-center md:space-x-10 md:space-y-0">

      <a class="group bg-red-500 rounded-xl overflow-hidden hover:bg-red-600 cursor-pointer">
        <div class="header">
          <div class="h-32 w-full flex">
            <img src="https://via.placeholder.com/600x300" alt="" class="w-full h-full object-cover">
          </div>
        </div>

        <div class="body p-5 text-white">
          <p class="font-bold pb-2">Título</p>
          <p class="line-clamp-2">TextoTexto Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto</p>
          <span class="text-xs">Publicado em 17/04/2022</span>
        </div>
      </a>

      <a class="group bg-red-500 rounded-xl overflow-hidden hover:bg-red-600 cursor-pointer">
        <div class="header">
          <div class="h-32 w-full flex">
            <img src="https://via.placeholder.com/600x300" alt="" class="w-full h-full object-cover">
          </div>
        </div>

        <div class="body p-5 text-white">
          <p class="font-bold pb-2">Título</p>
          <p class="line-clamp-2">TextoTexto Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto</p>
          <span class="text-xs">Publicado em 17/04/2022</span>
        </div>
      </a>


      <a class="group bg-red-500 rounded-xl overflow-hidden hover:bg-red-600 cursor-pointer">
        <div class="header">
          <div class="h-32 w-full flex">
            <img src="https://via.placeholder.com/600x300" alt="" class="w-full h-full object-cover">
          </div>
        </div>

        <div class="body p-5 text-white">
          <p class="font-bold pb-2">Título</p>
          <p class="line-clamp-2">TextoTexto Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto</p>
          <span class="text-xs">Publicado em 17/04/2022</span>
        </div>
      </a>

    </div>

  </div>

  <!-- Editias -->

  <div class="mt-16 mx-4 md:mt-20 md:mx-20">
    <span class="flex items-center justify-between">
      <div>
        <p class="text-xl text-gray-600 font-bold md:text-2xl">Editais</p>
        <p class="text-gray-400">Clique no edital para baixar</p>
      </div>
      <a href="#" class="text-sm text-sky-500 md:text-base">Ver mais</a>
    </span>

    <div class="mt-8 grid space-y-8 md:mt-10">
      <a class="group flex items-center space-x-2 hover:text-red-500 cursor-pointer">
        <p><PaperClipIcon class="h-8 text-red-500"/></p>
        <p class="font-bold text-left md:text-xl">EDITAL 2022.4 EDITAL 2022.4 EDITAL 2022.4 EDITAL 2022.4 EDITAL 2022.4</p>
      </a>

      <a class="flex items-center space-x-2 hover:text-red-500 cursor-pointer">
        <p><PaperClipIcon class="h-8 text-red-500"/></p>
        <p class="font-bold text-left md:text-xl">EDITAL 2022.4 EDITAL 2022.4 EDITAL 2022.4 EDITAL 2022.4 EDITAL 2022.4</p>
      </a>

      <a class="flex items-center space-x-2 hover:text-red-500 cursor-pointer">
        <p><PaperClipIcon class="h-8 text-red-500"/></p>
        <p class="font-bold text-left md:text-xl">EDITAL 2022.4 EDITAL 2022.4 EDITAL 2022.4 EDITAL 2022.4 EDITAL 2022.4</p>
      </a>
    </div>

  </div>

  <!-- Eventos -->

  <div class="mt-16 mx-4 md:mx-20 md:mt-20">
    <span class="flex items-center justify-between">
      <div>
        <p class="text-xl text-gray-600 font-bold md:text-2xl">Próximos eventos</p>
        <p class="text-gray-400">Confira os nossos eventos</p>
      </div>
      <a href="#" class="text-sm text-sky-500 md:text-base">Ver mais</a>
    </span>

    <div class="mt-8 grid space-y-8 md:mt-16 md:flex md:flex-row md:justify-center md:space-x-10 md:space-y-0">

      <a class="group bg-white shadow flex flex-col rounded-xl p-5 hover:bg-red-500 hover:text-white cursor-pointer md:px-10">
          <h3 class="font-bold text-xl">Título</h3>
          <p class="text-sm text-gray-400 group-hover:text-white mt-1 border-b-2 border-red-400 pb-2">24/04/2022 &bull; 19:00 horas</p>
          <p class="font-medium py-2">descrição</p>
          <div class="flex items-center space-x-2 mt-5 text-sm text-red-400 group-hover:text-white font-bold">
              <p>Ver detalhes</p>
              <ArrowRightIcon class="h-5"/> 
          </div>
      </a>

      <a class="group bg-white shadow flex flex-col rounded-xl p-5 hover:bg-red-500 hover:text-white cursor-pointer md:px-10">
          <h3 class="font-bold text-xl ">Título</h3>
          <p class="text-sm text-gray-400 group-hover:text-white mt-1 border-b-2 border-red-400 pb-2">24/04/2022 &bull; 19:00 horas</p>
          <p class="font-medium py-2">descrição</p>
          <div class="flex items-center space-x-2 mt-5 text-sm text-red-400 group-hover:text-white font-bold">
              <p>Ver detalhes</p>
              <ArrowRightIcon class="h-5"/> 
          </div>
      </a>

      <a class="group bg-white shadow flex flex-col rounded-xl p-5 hover:bg-red-500 hover:text-white cursor-pointer md:px-10">
          <h3 class="font-bold text-xl ">Título</h3>
          <p class="text-sm text-gray-400 group-hover:text-white mt-1 border-b-2 border-red-400 pb-2">24/04/2022 &bull; 19:00 horas</p>
          <p class="font-medium py-2">descrição</p>
          <div class="flex items-center space-x-2 mt-5 text-sm text-red-400 group-hover:text-white font-bold">
              <p>Ver detalhes</p>
              <ArrowRightIcon class="h-5"/> 
          </div>
      </a>

    </div>

  </div>

  <!-- Footer -->
  <div class="mt-16">
    <div class="bg-red-500 text-white px-4 py-8 text-right">
      <p class="font-bold">Universidade Federal da Paraíba - UFPB</p>
      <p>secretariaccta@ccta.ufpb.br / ascimcctaufpb@gmail.com</p>
      <p>Campus I - Cidade Universitária - João Pessoa - PB - Brasil</p> 
      <p>CEP: 58051-900</p>
    </div>
  </div>

</template>

