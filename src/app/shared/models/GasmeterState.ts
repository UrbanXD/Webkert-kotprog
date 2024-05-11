import { Timestamp } from '@firebase/firestore-types';

export interface GasmeterState {
  id?: string,
  gasmeterid: string,
  state: number,
  date?: Timestamp
}
