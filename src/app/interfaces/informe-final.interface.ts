import { File } from './file.interface';
import { Propuesta } from './propuesta.interface';
import { User } from './user.interface';

export interface InformeFinal {
  id: string;
  propuestaId: string;
  directorId: string;
  codirectorId: string;
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
  comentario: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface JuradoInformeFinal extends Jurado {
  informeFinal: InformeFinal;
}

export interface InformeFinalFile {
  id: string;
  fileId: string;
  propuestaId: string;
  tipo: TipoInformeFinalFile;
  file: File;
  user: User;
}

export interface CreateInformeFinal
  extends Omit<
    InformeFinal,
    | 'id'
    | 'propuestaId'
    | 'estado'
    | 'createdAt'
    | 'updatedAt'
    | 'files'
    | 'propuesta'
    | 'director'
    | 'codirector'
    | 'jurados'
  > {
  informeFinal: Blob;
}

export type UpdateInformeFinal = Pick<
  InformeFinal,
  'codirectorId' | 'directorId' | 'conclusiones' | 'trabajoFuturo'
>;

export type UpdateEstadoInformeFinal = Pick<InformeFinal, 'estado'>;

export type UpdateJuradosInformeFinal = Pick<
  Jurado,
  'userId' | 'informeFinalId'
>;

export type EstadoInformeFinal =
  | 'APROBADO'
  | 'PENDIENTE'
  | 'CAMBIOS'
  | 'NO_APROBADO';

export type TipoInformeFinalFile = 'INFORME_FINAL';
