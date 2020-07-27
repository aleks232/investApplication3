export interface IDocuments {
  id?: number;
  title?: string;
  description?: string;
  type?: string;
  packageDocumentId?: number;
}

export const defaultValue: Readonly<IDocuments> = {};
