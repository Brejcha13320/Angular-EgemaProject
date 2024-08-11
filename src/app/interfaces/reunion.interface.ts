import { User } from "./user.interface";

export interface Reunion {
  id: string,
  asunto: string,
  createdAt: Date,
  updatedAt: Date,
  files: ReunionFile,
  participantes: Participante[],
}

export interface Participante {
  id: string,
  userId: string,
  reunionId: string,
  createdAt: Date,
  updatedAt: Date,
  user: User,
}

export interface ReunionFile {
  id: string,
  fileId: string,
  reunionId: string,
  tipo: TipoReunionFile,
  file: any,
}

export type TipoReunionFile =
  | 'ACTA_REUNION';
