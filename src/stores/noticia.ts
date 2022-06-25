import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { ref as refStorage, getDownloadURL } from 'firebase/storage';
import { db, noticiaColecao, storage } from '../boot/firebase';
import { defineStore } from 'pinia';

import Noticia, { NoticiaEstado } from '../models/domain/noticias/noticia';
import { ref } from 'vue';

export const useNoticiaStore = defineStore('noticia', () => {
  const noticiaSelecionada = ref<Noticia>();

  const ultimaConsulta = ref({});

  async function getNoticias(total: number): Promise<Noticia[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'noticias'),
        where('estado', '==', NoticiaEstado.PUBLICADO),
        orderBy('publicadoEm', 'desc'),
        limit(total)
      )
    );
    const noticias: Noticia[] = [];

    for (const doc of querySnapshot.docs) {
      let url = '';
      if (doc.data().capa) {
        url = await getDownloadURL(refStorage(storage, doc.data().capa));
      }

      noticias.push(
        new Noticia(
          doc.id,
          doc.data().titulo,
          doc.data().texto,
          doc.data().estado as NoticiaEstado,
          doc.data().criadoPor,
          doc.data().criadoEm.toDate(),
          doc.data().publicadoEm?.toDate() ?? null,
          doc.data().publicadoPor ?? null,
          url,
          doc.data().editadoPor ?? null,
          doc.data().editadoEm?.toDate() ?? null
        )
      );
    }

    return noticias;
  }

  async function getNoticia(uid: string) {
    if (!noticiaSelecionada.value) {
      const docSnapshot = await getDoc(doc(db, 'noticias', uid));

      if (docSnapshot.exists()) {
        let url = '';
        if (docSnapshot.data().capa) {
          url = await getDownloadURL(
            refStorage(storage, docSnapshot.data().capa)
          );
        }

        noticiaSelecionada.value = new Noticia(
          docSnapshot.id,
          docSnapshot.data().titulo,
          docSnapshot.data().texto,
          docSnapshot.data().estado as NoticiaEstado,
          docSnapshot.data().criadoPor,
          docSnapshot.data().criadoEm.toDate(),
          docSnapshot.data().publicadoEm?.toDate() ?? null,
          docSnapshot.data().publicadoPor ?? null,
          url,
          docSnapshot.data().editadoPor ?? null,
          docSnapshot.data().editadoEm?.toDate() ?? null
        );
      }
    }
  }

  async function getNoticiaPaginacao() {
    const docSnap = await getDocs(
      query(
        noticiaColecao,
        where('estado', '==', NoticiaEstado.PUBLICADO),
        orderBy('publicadoEm', 'desc'),
        startAfter(ultimaConsulta.value || {}),
        limit(10)
      )
    );

    ultimaConsulta.value = docSnap.docs[docSnap.docs.length - 1];

    const noticias: Noticia[] = [];
    for (const doc of docSnap.docs) {
      let url = '';
      if (doc.data().capa) {
        url = await getDownloadURL(refStorage(storage, doc.data().capa));
      }

      noticias.push(
        new Noticia(
          doc.id,
          doc.data().titulo,
          doc.data().texto,
          doc.data().estado as NoticiaEstado,
          doc.data().criadoPor,
          doc.data().criadoEm.toDate(),
          doc.data().publicadoEm?.toDate() ?? null,
          doc.data().publicadoPor ?? null,
          url,
          doc.data().editadoPor ?? null,
          doc.data().editadoEm?.toDate() ?? null
        )
      );
    }

    return noticias;
  }

  return {
    getNoticias,
    noticiaSelecionada,
    getNoticia,
    getNoticiaPaginacao,
    ultimaConsulta,
  };
});
