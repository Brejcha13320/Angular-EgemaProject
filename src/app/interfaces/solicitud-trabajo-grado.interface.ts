import { User } from './user.interface';

export interface SolicitudTrabajoGrado {
  id: string;
  estudianteId: string;
  opcion: OpcionSolicitudTrabajoGrado;
  estudiante: User;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateSolicitudTrabajoGrado = Pick<SolicitudTrabajoGrado, 'opcion'>;

export type OpcionSolicitudTrabajoGrado =
  | 'TRABAJO_GRADO'
  | 'INVESTIGACION'
  | 'ESPECIALIZACION'
  | 'PRUEBAS_SABER_PRO';
