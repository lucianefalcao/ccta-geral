import { doc, getDoc } from 'firebase/firestore';
import { db } from '../boot/firebase';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import Usuario from 'src/models/domain/usuarios/usuario';

export const useUsuarioStore = defineStore('usuario', () => {
  const usuarioSelecionado = ref<Usuario>();

  async function getUsuario(uid: string): Promise<Usuario | null> {
    if (!usuarioSelecionado.value) {
      const docSnapshot = await getDoc(doc(db, 'usuarios', uid));

      if (docSnapshot.exists()) {
        return new Usuario(
          docSnapshot.id,
          docSnapshot.data().nome,
          docSnapshot.data().email
        );
      }

      return null;
    }
  }

  return {
    usuarioSelecionado,
    getUsuario,
  };
});
