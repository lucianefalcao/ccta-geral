<script setup lang="ts">
import CardNoticia from './CardNoticia.vue';

const noticias = [
  { 
    titulo: 'Título 1',
    texto: "<p>Oh yeah. It's the best part. It's crunchy, it's explosive, it's where the muffin breaks free of the pan and sort of does it's own thing. I'll tell you. That's a million dollor idea right there. Just sell the tops.</p>",
    data: '21/04/2022',
    imgSrc: 'https://via.placeholder.com/600x300',
    rota: '#'
  },
  { 
    titulo: 'Título 2',
    texto: "<p>Oh yeah. It's the best part. It's crunchy, it's explosive, it's where the muffin breaks free of the pan and sort of does it's own thing. I'll tell you. That's a million dollor idea right there. Just sell the tops.</p>",
    data: '21/04/2022',
    imgSrc: 'https://via.placeholder.com/600x300',
    rota: '#'
  },
  { 
    titulo: 'Título 3',
    texto: "<p>Oh yeah. It's the best part. It's crunchy, it's explosive, it's where the muffin breaks free of the pan and sort of does it's own thing. I'll tell you. That's a million dollor idea right there. Just sell the tops.</p>",
    data: '21/04/2022',
    imgSrc: 'https://via.placeholder.com/600x300',
    rota: '#'
  },
]

</script>

<template>
  <CardNoticia
    v-for="noticia in noticias"
    :key="noticia.titulo"
    :titulo="noticia.titulo"
    :texto="noticia.texto"
    :img-src="noticia.imgSrc"
    :data="noticia.data"
    :rota="noticia.rota"
  />
</template>