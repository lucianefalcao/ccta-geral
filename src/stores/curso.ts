import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import Curso from 'src/models/domain/cursos/curso';
import { db } from 'src/boot/firebase';

export const useCursoStore = defineStore('curso', () => {
  const cursoSelecionado = ref<Curso>();

  const ultimaConsulta = ref();

  async function getCurso(uid: string) {
    if (!cursoSelecionado.value) {
      const docSnapshot = await getDoc(doc(db, 'noticias', uid));

      if (docSnapshot.exists()) {
        cursoSelecionado.value = new Curso(
          docSnapshot.id,
          docSnapshot.data().nome,
          docSnapshot.data().descricao,
          docSnapshot.data().tipo,
          docSnapshot.data().subtipo,
          docSnapshot.data().nrPeriodos,
          docSnapshot.data().usuario,
          docSnapshot.data().turno,
          docSnapshot.data().ultimaModificacao.toDate()
        );
      }
    }
  }

  async function getCursosPaginacao() {
    let docSnap;
    if (!ultimaConsulta.value) {
      docSnap = await getDocs(
        query(collection(db, 'cursos'), orderBy('nome'), limit(10))
      );
    } else {
      docSnap = await getDocs(
        query(
          collection(db, 'cursos'),
          orderBy('nome'),
          startAfter(ultimaConsulta.value),
          limit(10)
        )
      );
    }

    ultimaConsulta.value = docSnap.docs[docSnap.docs.length - 1];

    const cursos: Curso[] = [];
    for (const doc of docSnap.docs) {
      cursos.push(
        new Curso(
          doc.id,
          doc.data().nome,
          doc.data().descricao,
          doc.data().tipo,
          doc.data().subtipo,
          doc.data().nrPeriodos,
          doc.data().usuario,
          doc.data().turno,
          doc.data().ultimaModificacao.toDate()
        )
      );
    }

    return cursos;
  }

  return {
    cursoSelecionado,
    getCurso,
    getCursosPaginacao,
    ultimaConsulta,
  };
});
