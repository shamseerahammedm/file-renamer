export const deleteFileItem = (fileId : any, files : Array<any>) => {
  const fileArray = files.filter((fileItem: any) => fileItem.fileId !== fileId);
  return fileArray;
};