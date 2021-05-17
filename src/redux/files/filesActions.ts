import { handleActionStart, handleNonAPIActionFailure, handleNonAPIActionSuccess } from 'utils/utils';
import fileActionTypes from './filesTypes';
import { readURL, getFileSizeToShow, getExtensionFromFileName } from './filesUtils';
import { v4 as uuidv4 } from 'uuid';

export const setFilesAsync = (fileData: any) =>
{
  return async (dispatch: any, getState: any) =>
  {
    dispatch(handleActionStart(fileActionTypes.SET_FILES_START));
    try
    {
      const fileDetails = fileData.map(async (fileItem: any, index: number) =>
      {
        const data: any = {};
        data.fileId = uuidv4();
        // appending imageUrl 
        data.imageSrcUrl = await readURL(fileItem);
        // appending file size 
        data.fileSizeToShow = getFileSizeToShow(fileItem.size);
        // appending extension 
        data.fileExtension = getExtensionFromFileName(fileItem.name);
        //appending rest of the items 
        for (const property in fileItem)
        {
          data[property] = fileItem[property];
        }
        return data;
      });
      const fileDataResolved = await Promise.all(fileDetails);
      dispatch(handleNonAPIActionSuccess(fileActionTypes.SET_FILES_SUCCESS, fileDataResolved));
      const { files : { files } } = getState();
      // setting storage filter with state data for filtering purposes
      dispatch(setFilesStorageFilter(files));
    }
    catch (err)
    {
      dispatch(handleNonAPIActionFailure(fileActionTypes.SET_FILES_FAILURE, err));
    }
  };
};

export const clearFiles = () => ({
  type: fileActionTypes.CLEAR_FILES
});

export const updateFilesAfterFiltering = (files: Array<any>) => ({
  type: fileActionTypes.UPDATE_FILES_AFTER_FILTERING,
  payload: files
});

export const setFilesStorageFilter = (files: Array<any>) => ({
  type: fileActionTypes.SET_FILES_STORAGE_FILTER,
  payload: files
});

export const deleteFileItem = (fileId: string) => ({
  type: fileActionTypes.REMOVE_FILE_ITEM,
  payload: fileId
});

export const makeFolders = (folderData: Array<any>) => ({
  type: fileActionTypes.MAKE_FOLDER,
  payload: folderData
});

