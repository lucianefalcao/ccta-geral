import { Timestamp } from 'firebase/firestore';

export default interface Noticia {
  titulo: string;
  texto: string;
  estado: string;
  criadoEm: Timestamp;
  criadoPor: string;
  editadoEm?: Timestamp;
  editadoPor?: string;
  publicadoEm?: Timestamp;
  publicadoPor?: string;
  capa?: string;
}
