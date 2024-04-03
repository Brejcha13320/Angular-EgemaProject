export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: RolUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterUser {
  user: User;
}

export interface LoginUser extends RegisterUser {
  token: string;
}

export type RolUser =
  | 'ESTUDIANTE'
  | 'DOCENTE'
  | 'COMITE'
  | 'JEFE_PRACTICA'
  | 'COORDINADOR_PRACTICA'
  | 'ADMIN';
