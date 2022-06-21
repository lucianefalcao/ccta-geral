import { boot } from 'quasar/wrappers';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  DocumentData,
  CollectionReference,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import Noticia from '../models/firebase/Noticia';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

const noticiaColecao = createCollection<Noticia>('noticias');

export { db, storage, noticiaColecao };

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async (/* { app, router, ... } */) => {
//   // something to do
// });
