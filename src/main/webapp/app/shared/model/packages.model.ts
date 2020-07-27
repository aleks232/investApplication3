import { IDocuments } from 'app/shared/model/documents.model';

export interface IPackages {
  id?: number;
  title?: string;
  description?: string;
  documents?: IDocuments[];
  lotId?: number;
}

export const defaultValue: Readonly<IPackages> = {};
