import { isNullOrUndefined } from 'util';

export const saveBlobFile = (fileString: string, fileName: string, type?: string) => {
  const a = document.createElement('a');
  a.download = fileName;
  const blob = new Blob([fileString], { type: type ?? 'text/xml' });
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 500);
};

export const checkObj = <T extends {}>(obj?: T | null): T => {
  const objectToCheck = obj ?? ({} as T);
  Object.entries(objectToCheck).forEach(([key, data]) => {
    if (isNullOrUndefined(objectToCheck[key]) || objectToCheck[key] === '') {
      delete objectToCheck[key]; // eslint-disable-line
    }
  });
  return objectToCheck;
};
