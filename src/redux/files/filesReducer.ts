import fileActionTypes from './filesTypes';
import { deleteFileItem } from './filesUtils';

interface initialStateProps {
  files: Array<any>;
  processingSpaceFolders: Array<any>;
  isLoading: Boolean,
  errorData: null,
  filesStorageForFilter: Array<any>;
  folders: Array<any>;
  isProcessing : Boolean
  filesToggle : Boolean
}

const INITIAL_STATE : initialStateProps = {
  files: [],
  processingSpaceFolders: [],
  isLoading: false,
  errorData: null,
  filesStorageForFilter: [],
  folders: [],
  isProcessing : false,
  filesToggle : false
};

const filesReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

  case fileActionTypes.IMPORT_FILES_START:
    return {
      ...state,
      isLoading: true
    };

  case fileActionTypes.IMPORT_FILES_SUCCESS:
    return {
      ...state,
      // filesToggle: !state.filesToggle,
      isLoading: false
    };

  case fileActionTypes.IMPORT_FILES_FAILURE:
    return {
      ...state,
      isLoading: false,
      errorData: action.payload
    };

    // filter by tags are working based on this 
  case fileActionTypes.SET_FILES_STORAGE_FILTER:
    return {
      ...state,
      filesStorageForFilter: [...action.payload],
    };

  case fileActionTypes.CLEAR_FILES:
    return {
      ...state,
      files: [],
      filesStorageForFilter: []
    };

  case fileActionTypes.REMOVE_FILE_ITEM:
    return {
      ...state,
      files: deleteFileItem(action.payload, state.files),
      filesStorageForFilter: deleteFileItem(action.payload, state.filesStorageForFilter)
    };

  case fileActionTypes.SET_FILES:
    return {
      ...state,
      files : action.payload
    };
    
  case fileActionTypes.IS_PROCESSING:
    return {
      ...state,
      isProcessing: action.payload
    };

  case fileActionTypes.FETCH_FILTERED_FILES_START:
    return {
      ...state,
      isProcessing: true,
    };
  case fileActionTypes.FETCH_FILTERED_FILES_SUCCESS:
    return {
      ...state,
      isProcessing: false,
      files : action.payload
    };
  case fileActionTypes.FETCH_FILTERED_FILES_FAILURE:
    return {
      ...state,
      isProcessing: false,
    };

  default:
    return state;

  }
};

export default filesReducer;