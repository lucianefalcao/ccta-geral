import { getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { ref as refStorage, getDownloadURL } from 'firebase/storage';
import { noticiaColecao, storage } from '../boot/firebase';
import { defineStore } from 'pinia';

import Noticia from '../models/domain/Noticia';

export const useNoticiaStore = defineStore('noticia', () => {
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
        titulo: doc.data().title,
        texto: doc.data().newsText,
        data: readableDate,
        estado: doc.data().state,
        imgSrc: url,
      });
    }

    return noticias;
  }

  const lastModified = (data: number): string => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return { getNoticias };
});
