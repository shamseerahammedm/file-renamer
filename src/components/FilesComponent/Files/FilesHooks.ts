import { db } from 'App';
import { useLiveQuery } from 'dexie-react-hooks';
import { file } from 'dexie.config';
import { findIndex } from 'lodash';
import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { isProcessing, importFilesAsync, fetchFilteredFilesAsync, setFiles } from 'redux/files/filesActions';

/* 
  For handling import 
*/
const useHandleImportFiles = () => {
  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    item: {
      name: 'filesDropArea'
    },
    drop: (item: any, monitor) => {
      dispatch(importFilesAsync(item.files));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  return {
    ref: drop,
    isActive
  };
};

/* 
  For handling filter
*/
const useHandleFilter = () => {
  const dispatch = useDispatch();
  const { files, filterOptions } = useSelector((state: RootStateOrAny) => state.files);

  // handling change event of filter checkbox buttons
  const [itemsPicked, setItemsPicked] = useState<Array<string>>(['all']);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setItemsPicked([...itemsPicked, value]);
    }
    else {
      setItemsPicked(itemsPicked.filter(item => item !== value));
    }
  };

  // do filter and show files when filter array changes
  useEffect(() => {
    dispatch(fetchFilteredFilesAsync(itemsPicked));
  }, [itemsPicked]);

  return {
    itemsPicked,
    filterOptions,
    handleChange,
  };
};

/* 
  Custom function for handling live fetching of data
*/
const useLiveFetching = () => {
  const dispatch = useDispatch();

  const dbFiles = useLiveQuery(async () => {
    dispatch(isProcessing(true));
    const files = await db.file.toArray();
    dispatch(setFiles(files));
    dispatch(isProcessing(false));
    return files;
  }, []);

  return {
    dbFiles
  };
};

/* 
  Hook for getting filters
*/
const useGetFilters = () => {
  const [isFilterLoading, setIsFilterLoading] = useState<Boolean>(false);

  const filterOptions = useLiveQuery(async () => {
    setIsFilterLoading(true);
    const filesArray = await db.file.toArray();
    const filterOptionsData = filesArray.filter((fileItem : file, index : number, currentArray : Array<any>) => {
      return index === currentArray.findIndex(( currentItem => {
        return fileItem.extension.toLocaleLowerCase() === currentItem.extension.toLocaleLowerCase();
      }));
    });
    console.log('filterOptionsData', filterOptionsData);
    setIsFilterLoading(false);
    return filterOptionsData;
  }, []);

  return {
    isFilterLoading,
    filterOptions
  };
};

export {
  useHandleImportFiles,
  useHandleFilter,
  useLiveFetching,
  useGetFilters
};
