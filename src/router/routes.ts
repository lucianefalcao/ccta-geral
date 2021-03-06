import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/noticias',
        component: () => import('pages/noticias/NoticiasPage.vue'),
      },
      {
        path: '/noticias/:uid',
        name: 'noticia',
        component: () => import('pages/noticias/NoticiaPage.vue'),
      },
      {
        path: '/eventos',
        component: () => import('pages/eventos/EventosIndex.vue'),
      },
      {
        path: '/eventos/:uid',
        name: 'evento',
        component: () => import('pages/eventos/EventoDetalhe.vue'),
      },
      {
        path: '/editais',
        component: () => import('pages/editais/EditaisIndex.vue'),
      },
      {
        path: '/cursos',
        component: () => import('pages/cursos/CursosIndex.vue'),
      },
      {
        path: '/atendimento',
        component: () => import('pages/atendimento/AtendimentoIndex.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
