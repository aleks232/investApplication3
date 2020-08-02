export type FileData = {
  id: string;
  name: string;
  fileBlob: File;
  actionStatus: 'delete' | 'save' | 'uploaded';
};

export const isLocalUploadFile = (file: FileData): file is FileData => 'actionStatus' in file;

export const getFormData = (files: FileData[], contentType: string) => {
  const formData = new FormData();
  const newFiles = [] as FileData[];

  files.forEach(file => {
    if (isLocalUploadFile(file)) {
      newFiles.push(file);
    }
  });

  if (newFiles.length > 0) {
    formData.append('file', newFiles[0].fileBlob);
    //   formData.append('name', newFiles[0].name);
    //   formData.append('contentType', contentType);
  }

  return formData;
};

export const initUploadFile = (file: File): FileData => ({
  id: '1',
  name: file.name,
  fileBlob: file,
  actionStatus: 'save',
});
