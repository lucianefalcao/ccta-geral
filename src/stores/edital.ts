import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { ref as refStorage, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../boot/firebase';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import Edital from 'src/models/domain/editais/edital';
import { useUsuarioStore } from './usuario';

export const useEditalStore = defineStore('edital', () => {
  const ultimaConsulta = ref({});

  async function baixarDocumento(documento: string): Promise<string> {
    return await getDownloadURL(refStorage(storage, documento));
  }

  async function getEditaisPaginacao() {
    const docSnap = await getDocs(
      query(
        collection(db, 'editais'),
        orderBy('criadoEm', 'desc'),
        startAfter(ultimaConsulta.value || {}),
        limit(10)
      )
    );

    ultimaConsulta.value = docSnap.docs[docSnap.docs.length - 1];

    const editais: Edital[] = [];
    for (const doc of docSnap.docs) {
      let url = '';
      if (doc.data().documento) {
        url = await getDownloadURL(refStorage(storage, doc.data().documento));
      }

      const usuarioStore = useUsuarioStore();
      const usuario = await usuarioStore.getUsuario(doc.data().criadoPor);

      editais.push(
        new Edital(
          doc.id,
          doc.data().titulo,
          url,
          usuario?.getNome() ?? 'Usuário não identificado',
          doc.data().criadoEm.toDate(),
          doc.data().editadoPor ?? null,
          doc.data().editadoEm?.toDate() ?? null
        )
      );
    }

    return editais;
  }

  return {
    baixarDocumento,
    getEditaisPaginacao,
    ultimaConsulta,
  };
});
