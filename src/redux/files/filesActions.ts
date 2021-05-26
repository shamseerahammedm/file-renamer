import { handleActionStart, handleNonAPIActionFailure, handleNonAPIActionSuccess, getExtensionFromFileName } from 'utils/utils';
import fileActionTypes from './filesTypes';
import { isItemImage } from './filesUtils';
import { db } from 'App';
import { folder } from 'utils/modals';

export const importFilesAsync = (fileData: any) => {
  return async (dispatch: any) => {
    dispatch(handleActionStart(fileActionTypes.IMPORT_FILES_START));
    try {
      const fileDetails = fileData.map((fileItem: any) => {
        const fileExtension = getExtensionFromFileName(fileItem.name);
        const isImage = isItemImage(fileExtension);
        return {
          extension: fileExtension,
          fileBlob: fileItem,
          imageSrcUrl: isImage ? URL.createObjectURL(fileItem) : null,
          isImage: isImage
        };
      });
      await db.transaction('rw', db.file, async () => {
        db.file.bulkAdd(fileDetails);
      });
      dispatch(handleNonAPIActionSuccess(fileActionTypes.IMPORT_FILES_SUCCESS, true));
    }
    catch (err) {
      dispatch(handleNonAPIActionFailure(fileActionTypes.IMPORT_FILES_FAILURE, err));
    }
  };
};

export const fetchFilesAsync = () => {
  return async (dispatch: any) => {
    try {
      dispatch(handleActionStart(fileActionTypes.FETCH_FILES_START));
      const files = await db.file.toArray();
      dispatch(handleNonAPIActionSuccess(fileActionTypes.FETCH_FILES_SUCCESS, files));
    }
    catch (err) {
      dispatch(handleNonAPIActionFailure(fileActionTypes.IMPORT_FILES_FAILURE));
    }
  };
};

// numberOfFiles, files, folderName, folderType
export const makeFolders = (folderData : folder) => {
  return async (dispatch: any) => {
    // try {
    //   dispatch(handleActionStart(fileActionTypes.MAKE_FOLDER_START));
    //   const folder = await db.folder.add(folderData);
    //   dispatch(handleNonAPIActionSuccess(fileActionTypes.MAKE_FOLDER_SUCCESS, files));
    // }
    // catch (err) {
    //   dispatch(handleNonAPIActionFailure(fileActionTypes.MAKE_FOLDER_FAILURE));
    // }
  };
};

export const fetchFilteredFilesAsync = (filterArray:string[]) => {
  return async (dispatch: any) => {
    try {
      dispatch(handleActionStart(fileActionTypes.FETCH_FILTERED_FILES_START));
      const filteredFilesPromise = db.file.filter((value : any) => filterArray.includes(value.extension));
      const filteredFiles = await filteredFilesPromise.toArray();
      dispatch(handleNonAPIActionSuccess(fileActionTypes.FETCH_FILTERED_FILES_SUCCESS, filteredFiles));
    }
    catch (err) {
      dispatch(handleNonAPIActionFailure(fileActionTypes.FETCH_FILTERED_FILES_FAILURE));
    }
  };
};

export const clearFiles = () => ({
  type: fileActionTypes.CLEAR_FILES
});

export const setFilesStorageFilter = (files: Array<any>) => ({
  type: fileActionTypes.SET_FILES_STORAGE_FILTER,
  payload: files
});

export const deleteFileItem = (fileId: string) => ({
  type: fileActionTypes.REMOVE_FILE_ITEM,
  payload: fileId
});

export const isProcessing = (payload: Boolean) => ({
  type: fileActionTypes.IS_PROCESSING,
  payload: payload
});

export const setFiles = (payload: Array<any>) => ({
  type: fileActionTypes.SET_FILES,
  payload: payload
});

