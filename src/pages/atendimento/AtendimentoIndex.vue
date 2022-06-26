<script setup lang="ts">
import {
  ref as refDatabase,
  push,
  onValue,
  get,
  child,
  query,
  limitToLast,
  orderByChild,
  onChildAdded,
} from 'firebase/database';
import { computed, onMounted, ref, nextTick } from '@vue/runtime-core';
import { database } from 'src/boot/firebase';
import dayjs from 'dayjs';
import { QCardSection, useQuasar } from 'quasar';
import Chat from 'src/models/domain/chat/chat';
import Membro, { MembroTipo } from 'src/models/domain/chat/membro';
import Mensagem from 'src/models/domain/chat/mensagem';
import ErroBanner from '../../components/ErroBanner.vue';

const $q = useQuasar();

const nome = ref<string>('');
const prompt = ref<boolean>(true);

const membros = ref<Membro[]>([]);
const mensagens = ref<Mensagem[]>([]);
const chat = ref<Chat>();
const atendimento = ref<QCardSection>();

const mensagem = ref<string>('');
const carregando = ref<boolean>(false);
const erroMensagem = ref<string>('');

const atendente = computed(() => {
  const atendentes = membros.value.filter(
    (m) => m.getTipo() === MembroTipo.ATENDENTE
  );
  if (atendentes.length > 0) {
    return true;
  }

  return false;
});

const regraNome = [
  (val: string) =>
    val.length >= 3 || 'Por favor, informe no mínimo três caracteres',
];

const podeEnviar = computed(() =>
  regraNome.every((regra) => regra(nome.value) === true)
);

const buscarMembros = async (chatId: string) => {
  const membrosRef = refDatabase(database, 'membros/' + chatId);
  onValue(membrosRef, async (snapshot) => {
    if (snapshot.exists()) {
      let mbs = [];
      membros.value = mbs;

      snapshot.forEach((snap) => {
        mbs.push(
          new Membro(
            snap.val().visitante,
            snap.val().visitante,
            MembroTipo.VISITANTE,
            snapshot.key
          )
        );

        if (snap.val().atendente) {
          membros.value.push(
            new Membro(
              snap.val().atendente.id,
              snap.val().atendente.nome,
              MembroTipo.ATENDENTE,
              snapshot.key
            )
          );
        }
      });
    }
  });
};

const escutarNovasMensagens = async (chatId: string) => {
  const mensagensRef = refDatabase(database, 'mensagens/' + chatId);
  const queryRef = query(
    mensagensRef,
    ...[orderByChild('timestamp'), limitToLast(50)]
  );
  onChildAdded(queryRef, (data) => {
    mensagens.value.push(
      new Mensagem(
        data.key,
        data.val().membro,
        data.val().mensagem,
        new Date(data.val().timestamp),
        chatId
      )
    );
    scrollToEnd();
  });
};

const enviarMensagem = async () => {
  const mensagemRef = refDatabase(database, 'mensagens/' + chat.value?.getId());
  await push(mensagemRef, {
    mensagem: mensagem.value,
    membro: nome.value,
    timestamp: new Date().getTime(),
  });
  mensagem.value = '';
};

const salvarNome = async () => {
  try {
    carregando.value = true;

    const novoChat = await push(refDatabase(database, 'chats/'), {
      timestamp: dayjs().unix(),
      ultimaMensagem: 'chat iniciado',
    });

    chat.value = new Chat(novoChat.key, 'chat iniciado', new Date());

    const membrosRef = refDatabase(database, 'membros/' + novoChat.key);
    await push(membrosRef, {
      visitante: nome.value,
    });

    await buscarMembros(novoChat.key);

    $q.localStorage.set('chatIdentificacao', novoChat.key);
    $q.localStorage.set('nomeAtendimento', nome.value);
  } catch (e) {
    erroMensagem.value =
      'Ocorreu um erro ao iniciar o atendimento. Por favor, volte mais tarde.';
  } finally {
    carregando.value = false;
  }
};

const scrollToEnd = (): void => {
  nextTick(() => {
    if (atendimento.value) {
      atendimento.value.$el.scrollTop = atendimento.value.$el.scrollHeight;
    }
  });
};

onMounted(async () => {
  try {
    carregando.value = true;
    if (
      $q.localStorage.has('chatIdentificacao') &&
      $q.localStorage.has('nomeAtendimento')
    ) {
      prompt.value = false;
      nome.value = $q.localStorage.getItem('nomeAtendimento');
      const chave = $q.localStorage.getItem('chatIdentificacao');

      const chatRef = refDatabase(database);
      const doc = await get(child(chatRef, 'chats/' + chave));

      if (doc.exists()) {
        chat.value = new Chat(
          doc.key,
          doc.val().ultimaMensagem,
          new Date(doc.val().timestamp)
        );
      } else {
        prompt.value = true;
        nome.value = '';
        return;
      }

      await buscarMembros(doc.key);
      escutarNovasMensagens(doc.key);
    }
  } catch (e) {
    erroMensagem.value =
      'Ocorreu um erro ao iniciar o atendimento. Por favor, volte mais tarde.';
  } finally {
    carregando.value = false;
  }
});
</script>

<template>
  <div class="col">
    <div class="row flex-center">
      <ErroBanner v-if="!carregando && erroMensagem" :mensagem="erroMensagem" />
      <q-spinner-hourglass v-if="carregando" color="primary" size="2em" />

      <q-card v-else flat style="width: 100%; max-width: 600px">
        <q-card-section ref="atendimento" class="chat-container q-px-sm">
          <div
            v-for="mensagem in mensagens"
            :key="mensagem.getId()"
            class="row"
            :class="
              mensagem.getMembro() === nome ? 'justify-end' : 'justify-start'
            "
          >
            <q-chat-message
              :name="mensagem.getMembro()"
              :sent="mensagem.getMembro() === nome"
              :text="[mensagem.getTexto()]"
              :bg-color="
                mensagem.getMembro() === nome ? 'primary' : 'secondary'
              "
              text-color="white"
            ></q-chat-message>
          </div>
          <div class="row justify-center q-mt-lg" v-if="!atendente">
            Aguardando atendente&hellip;
          </div>
        </q-card-section>

        <q-card-section class="q-px-none">
          <div class="row items-center">
            <div class="col-10">
              <q-input
                label="Envie uma mensagem"
                v-model.trim="mensagem"
                outlined
                @keyup.enter="enviarMensagem"
              ></q-input>
            </div>
            <div class="col-2">
              <q-btn
                icon="o_send"
                flat
                color="primary"
                :disable="mensagem.length === 0"
                @click="enviarMensagem"
              ></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 260px">
      <q-card-section>
        <div class="text-h6 text-secondary">Seu nome</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model.trim="nome"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn class="text-secondary" flat label="Cancelar" v-close-popup />
        <q-btn
          :disabled="!podeEnviar"
          flat
          label="Enviar"
          v-close-popup
          @click="salvarNome"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.scrollable {
  overflow-y: auto;
  height: 80vh;
}

.chat-container {
  box-sizing: border-box;
  height: calc(80vh - 7rem);
  overflow-y: auto;
  padding: 10px;
}

.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}
</style>
