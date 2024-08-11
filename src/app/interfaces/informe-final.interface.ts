import { File } from './file.interface';
import { Propuesta } from './propuesta.interface';
import { User } from './user.interface';

export interface InformeFinal {
  id: string;
  propuestaId: string;
  directorId: string;
  coordinadorId: string;
  conclusiones: string;
  trabajoFuturo: string;
  estado: EstadoInformeFinal;
  createdAt: Date;
  updatedAt: Date;
  files: InformeFinalFile[];
  propuesta: Propuesta;
  director: User;
  codirector: User;
  jurados: Jurado[];
}

export interface Jurado {
  id: string;
  userId: string;
  informeFinalId: string;
  comentario: String;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface InformeFinalFile {
  id: string;
  fileId: string;
  propuestaId: string;
  tipo: TipoInformeFinalFile;
  file: File;
  user: User;
}

export type EstadoInformeFinal =
  | 'APROBADO'
  | 'PENDIENTE'
  | 'CAMBIOS'
  | 'NO_APROBADO';
export type TipoInformeFinalFile = 'INFORME_FINAL';
