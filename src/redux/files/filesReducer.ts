import fileActionTypes from './filesTypes';
import { deleteFileItem } from './filesUtils';

const INITIAL_STATE = {
  files: [],
  processingSpaceFolders : [],
  isLoading : false,
  errorData : null,
  filesStorageForFilter : [],
  folders : []
};

const filesReducer = (state = INITIAL_STATE, action : any) => {
  switch (action.type) {

  case fileActionTypes.SET_FILES_START :
    return {
      ...state,
      isLoading : true
    };

  case fileActionTypes.SET_FILES_SUCCESS :
    return {
      ...state,
      files : action.payload,
      isLoading : false
    };

  case fileActionTypes.SET_FILES_FAILURE :
    return {
      ...state,
      isLoading : false,
      errorData : action.payload
    };

    // filter by tags are working based on this 
  case fileActionTypes.SET_FILES_STORAGE_FILTER :
    return {
      ...state,
      filesStorageForFilter : [ ...action.payload],
    };
        
  case fileActionTypes.UPDATE_FILES_AFTER_FILTERING :
    return {
      ...state,
      files : [...action.payload],
    };
    
  case fileActionTypes.CLEAR_FILES :
    return {
      ...state,
      files : [],
      filesStorageForFilter : []
    };

  case fileActionTypes.REMOVE_FILE_ITEM :
    return {
      ...state,
      files : deleteFileItem(action.payload, state.files),
      filesStorageForFilter : deleteFileItem(action.payload, state.filesStorageForFilter)
    };

  case fileActionTypes.MAKE_FOLDER :
    return {
      ...state,
      folders : action.payload
    };

  default:
    return state;
            
  }
};

export default filesReducer;