import { db } from 'App';
import { useLiveQuery } from 'dexie-react-hooks';
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
  const { files } = useSelector((state: RootStateOrAny) => state.files);

  // minimized file array with out blob
  const newMinimizedFileArray = files.map((fileItem: any) => {
    return {
      fileId: fileItem.fileId,
      extension : fileItem.extension,
    };
  });

  // filter checkbox buttons data
  const uniqueFilterTags = newMinimizedFileArray.filter((fileItem: any, index: number, self: Array<any>) => {
    return index === self.findIndex(item => {
      return item.extension.toLowerCase() === fileItem.extension.toLowerCase();
    });
  });
  uniqueFilterTags.push({
    fileId: 'all',
    extension: 'all'
  });

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
    uniqueFilterTags,
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

export {
  useHandleImportFiles,
  useHandleFilter,
  useLiveFetching
};
