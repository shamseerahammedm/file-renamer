import { handleActionStart, handleNonAPIActionFailure, handleNonAPIActionSuccess, getExtensionFromFileName } from 'utils/utils';
import fileActionTypes from './filesTypes';
import { isItemImage } from './filesUtils';
import { db } from 'App';

export const setFilesAsync = (fileData: any) =>
{
  return async (dispatch: any, getState: any) =>
  {
    dispatch(handleActionStart(fileActionTypes.SET_FILES_START));
    try
    {
      const fileDetails = fileData.map((fileItem: any) => {
        const fileExtension = getExtensionFromFileName(fileItem.name);
        const isImage = isItemImage(fileExtension);
        return {
          extension : fileExtension,
          fileBlob : fileItem,
          imageSrcUrl : isImage ? URL.createObjectURL(fileItem) : null,
          isImage : isImage
        };
      });

      await db.transaction('rw', db.file, async () =>
      {
        db.file.bulkAdd(fileDetails);
      });

      dispatch(handleNonAPIActionSuccess(fileActionTypes.SET_FILES_SUCCESS, true));
      // const { files: { files } } = getState();
      // // setting storage filter with state data for filtering purposes
      // dispatch(setFilesStorageFilter(files));
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

