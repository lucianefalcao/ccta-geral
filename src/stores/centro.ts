import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../boot/firebase';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCentroStore = defineStore('centro', () => {
  const descricao = ref<string>();

  async function getDescricao(): Promise<void> {
    if (!descricao.value) {
      const docSnapshot = await getDocs(query(collection(db, 'centro')));

      if (!docSnapshot.empty) {
        descricao.value = docSnapshot.docs[0].data().descricao;
      }
    }
  }

  return {
    getDescricao,
    descricao,
  };
});
