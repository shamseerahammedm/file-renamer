export const readURL = (file : any) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e: any ) => res(e.target.result);
    reader.onerror = e => rej(e);
    reader.readAsDataURL(file);
  });
};

export const getFileSizeToShow = (fileSize : any) => {
  const fileTypeArrays = ['Bytes', 'KB', 'MB', 'GB'];
  let i = 0; while( fileSize>900) { fileSize/=1024; i++; }
  const exactSize = (Math.round(fileSize*100)/100)+' '+fileTypeArrays[i];
  return exactSize;
};

export const getExtensionFromFileName = (fileName : any) => fileName.substring(fileName.lastIndexOf('.')+1);

export const deleteFileItem = (dataSet : any, setName : any) => {

  const fileId = dataSet.fileId;
  const data = dataSet[setName];
  const filteredData = data.filter( (fileItem : any) => fileItem.fileId !== fileId);
  return filteredData;

};