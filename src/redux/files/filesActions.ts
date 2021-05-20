import { handleActionStart, handleNonAPIActionFailure, handleNonAPIActionSuccess, getBlob } from 'utils/utils';
import fileActionTypes from './filesTypes';
import { readURL, getFileSizeToShow, getExtensionFromFileName } from '../../utils/utils';
import { db } from 'App';

export const setFilesAsync = (fileData: any) =>
{
  return async (dispatch: any, getState: any) =>
  {
    dispatch(handleActionStart(fileActionTypes.SET_FILES_START));
    try
    {

      const fileDetails = fileData.map((fileItem: any) => {
        return {
          name : fileItem.name,
          size : fileItem.size,
          extension : getExtensionFromFileName(fileItem.name),
          fileBlob : 1234,
          lastModified : fileItem.lastModified,
          lastModifiedDate :fileItem.lastModifiedDate,
          type : fileItem.type
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

