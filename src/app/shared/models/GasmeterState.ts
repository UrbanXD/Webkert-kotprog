import { Timestamp } from '@firebase/firestore-types';

export interface GasmeterState{
  gasmeterid: string,
  state: number,
  date: Timestamp;
}
