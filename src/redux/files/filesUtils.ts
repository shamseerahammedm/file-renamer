export const deleteFileItem = (fileId : any, files : Array<any>) => {
  const fileArray = files.filter((fileItem: any) => fileItem.fileId !== fileId);
  return fileArray;
};

const allowedImageTypes: Array<string> = ['jpg', 'jpeg', 'png', 'webp'];

export const isItemImage = (fileExtension : string) => {
  const fileExtensionLowerCased = fileExtension.toLowerCase();
  const isImage = allowedImageTypes.includes(fileExtensionLowerCased);
  return isImage;
};
