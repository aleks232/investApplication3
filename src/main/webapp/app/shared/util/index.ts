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
