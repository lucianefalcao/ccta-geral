import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../boot/firebase';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import Evento from 'src/models/domain/eventos/evento';
import dayjs from 'dayjs';

export const useEventoStore = defineStore('evento', () => {
  const eventoSelecionado = ref<Evento>();

  const ultimaConsulta = ref({});

  async function getEvento(uid: string) {
    if (!eventoSelecionado.value || eventoSelecionado.value.getId() !== uid) {
      const docSnapshot = await getDoc(doc(db, 'eventos', uid));

      if (docSnapshot.exists()) {
        eventoSelecionado.value = new Evento(
          docSnapshot.id,
          docSnapshot.data().titulo,
          docSnapshot.data().descricao,
          docSnapshot.data().criadoPor,
          docSnapshot.data().data.toDate(),
          docSnapshot.data().criadoEm.toDate(),
          docSnapshot.data().editadoPor ?? null,
          docSnapshot.data().editadoEm?.toDate() ?? null
        );
      }
    }
  }

  async function getEventos(
    totalItens: number | null = null
  ): Promise<Evento[]> {
    const docSnap = await getDocs(
      query(
        collection(db, 'eventos'),
        where('data', '>=', dayjs().toDate()),
        orderBy('data'),
        limit(totalItens)
      )
    );

    const eventos: Evento[] = [];
    for (const doc of docSnap.docs) {
      eventos.push(
        new Evento(
          doc.id,
          doc.data().titulo,
          doc.data().descricao,
          doc.data().criadoPor,
          doc.data().data.toDate(),
          doc.data().criadoEm.toDate(),
          doc.data().editadoPor ?? null,
          doc.data().editadoEm?.toDate() ?? null
        )
      );
    }

    return eventos;
  }

  return {
    eventoSelecionado,
    ultimaConsulta,
    getEvento,
    getEventos,
  };
});
