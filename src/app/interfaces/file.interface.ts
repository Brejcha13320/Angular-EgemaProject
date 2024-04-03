export interface File {
  id: string;
  propuestaId: string | null;
  backblazeName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
