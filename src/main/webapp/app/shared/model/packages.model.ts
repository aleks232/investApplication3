import { DocumentsDTO } from 'app/swagger/model/documentsDTO';

export interface IPackages {
  id?: number;
  title?: string;
  description?: string;
  documents?: DocumentsDTO[];
  lotId?: number;
}

export const defaultValue: Readonly<IPackages> = {};
