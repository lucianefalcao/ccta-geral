import { boot } from 'quasar/wrappers';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  DocumentData,
  CollectionReference,
  connectFirestoreEmulator,
} from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';

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
const database = getDatabase(app);

if (process.env.ENV === 'dev') {
  connectFirestoreEmulator(db, '127.0.0.1', 8082);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectDatabaseEmulator(database, 'localhost', 9000);
}

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

const noticiaColecao = createCollection<Noticia>('noticias');

export { db, storage, database, noticiaColecao };

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async (/* { app, router, ... } */) => {
//   // something to do
// });
