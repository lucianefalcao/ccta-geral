import {
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { ref as refStorage, getDownloadURL } from 'firebase/storage';
import { db, noticiaColecao, storage } from '../boot/firebase';
import { defineStore } from 'pinia';

import Noticia from '../models/domain/Noticia';
import { ref } from 'vue';

export const useNoticiaStore = defineStore('noticia', () => {
  const noticiaSelecionada = ref<Noticia>({
    uid: '',
    titulo: '',
    texto: '',
    estado: '',
    imgSrc: '',
    data: '',
  });

  async function getNoticias(total: number): Promise<Noticia[]> {
    const querySnapshot = await getDocs(
      query(
        noticiaColecao,
        where('state', '==', 'published'),
        orderBy('lastModified', 'desc'),
        limit(total)
      )
    );
    const noticias: Noticia[] = [];

    for (const doc of querySnapshot.docs) {
      const url = await getDownloadURL(
        refStorage(storage, doc.data().coverPath)
      );

      const readableDate = lastModified(doc.data().lastModified);
      noticias.push({
        uid: doc.id,
        titulo: doc.data().title,
        texto: doc.data().newsText,
        data: readableDate,
        estado: doc.data().state,
        imgSrc: url,
      });
    }

    return noticias;
  }

  async function getNoticia(uid: string) {
    if (!noticiaSelecionada.value.uid) {
      const docSnapshot = await getDoc(doc(db, 'news', uid));

      if (docSnapshot.exists()) {
        const url = await getDownloadURL(
          refStorage(storage, docSnapshot.data().coverPath)
        );

        const readableDate = lastModified(docSnapshot.data().lastModified);
        noticiaSelecionada.value.uid = docSnapshot.id;
        noticiaSelecionada.value.titulo = docSnapshot.data().title;
        noticiaSelecionada.value.texto = docSnapshot.data().newsText;
        noticiaSelecionada.value.estado = docSnapshot.data().state;
        noticiaSelecionada.value.imgSrc = url;
        noticiaSelecionada.value.data = readableDate;
      }
    }
  }

  const lastModified = (data: number): string => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return { getNoticias, noticiaSelecionada, getNoticia };
});
