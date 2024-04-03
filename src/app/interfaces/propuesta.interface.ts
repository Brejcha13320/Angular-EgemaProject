import { File } from './file.interface';
import { SolicitudTrabajoGrado } from './solicitud-trabajo-grado.interface';

export interface Propuesta {
  id: string;
  solicitudTrabajoGradoId: string;
  titulo: string;
  lineaInvestigacion: LineaInvestigacionPropuesta;
  estado: EstadoPropuesta;
  problema: string;
  justificacion: string;
  objetivo: string;
  alcance: string;
  comentarios: string;
  cartaAceptacionDirector: string;
  propuestaTrabajoGrado: string;
  createdAt: Date;
  updatedAt: Date;
  solicitudTrabajoGrado: SolicitudTrabajoGrado;
  files: File[];
}

export interface CreatePropuesta
  extends Omit<
    Propuesta,
    | 'id'
    | 'estado'
    | 'comentarios'
    | 'cartaAceptacionDirector'
    | 'propuestaTrabajoGrado'
    | 'createdAt'
    | 'updatedAt'
  > {
  cartaAceptacionDirector: Blob;
  propuestaTrabajoGrado: Blob;
}

export type UpdatePropuestaEstudiante = Pick<
  Propuesta,
  | 'titulo'
  | 'lineaInvestigacion'
  | 'problema'
  | 'objetivo'
  | 'alcance'
  | 'justificacion'
>;

export type UpdateEstadoPropuesta = Pick<Propuesta, 'estado' | 'comentarios'>;

export type LineaInvestigacionPropuesta =
  | 'TELEMATICA_REDES'
  | 'INGENIERIA_SOFTWARE'
  | 'OTRA';

export type EstadoPropuesta =
  | 'APROBADO'
  | 'PENDIENTE'
  | 'CAMBIOS'
  | 'NO_APROBADO';
