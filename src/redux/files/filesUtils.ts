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

export const getFilterOptions = (files : any[]) => {
  const rawFileOptions = files.map(fileItem => {
    return {
      extension : fileItem.extension,
      fileId : fileItem.fileId
    };
  });
  const duplicateItemsRemovedArray = rawFileOptions.filter((filterOption, index, currentArray) => {
    return index === currentArray.findIndex( currentArrayFileItem => {
      return currentArrayFileItem.extension.toLowerCase() === filterOption.extension.toLowerCase();
    });
  });
  const fileOptions = [...duplicateItemsRemovedArray, {
    fileId: 'all',
    extension: 'all'
  }];
  return fileOptions;
};  