
import { db } from 'App';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { fetchFilesAsync, isProcessing, setFilesAsync, updateFilesAfterFiltering } from 'redux/files/filesActions';

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
    drop: (item: any, monitor) =>
    {
      dispatch(setFilesAsync(item.files));
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
  const { filesStorageForFilter } = useSelector((state: RootStateOrAny) => state.files);

  // filter checkbox buttons data
  const uniqueFilterTags = filesStorageForFilter.filter((fileItem: any, index: number, self: Array<any>) =>
  {
    return index === self.findIndex(item =>
    {
      return item.fileExtension === fileItem.fileExtension;
    });
  });
  uniqueFilterTags.push({
    fileId: 'all',
    fileExtension: 'all'
  });

  // handling change event of filter checkbox buttons
  const [itemsPicked, setItemsPicked] = useState<Array<string>>(['all']);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const { value, checked } = e.target;
    if (checked)
    {
      setItemsPicked([...itemsPicked, value]);
    }
    else
    {
      setItemsPicked(itemsPicked.filter(item => item !== value));
    }
  };

  // do filter and show files when filter array changes
  useEffect(() =>
  {
    let items;
    if (itemsPicked.includes('all'))
    {
      items = filesStorageForFilter;
    }
    else
    {
      items = filesStorageForFilter.filter((item: any) => itemsPicked.includes(item.fileExtension));
    }
    dispatch(updateFilesAfterFiltering(items));
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
  const { filesToggle, filesFetched } = useSelector((state: RootStateOrAny) => state.files);
  const dbFiles = useLiveQuery(async () => {
    dispatch(isProcessing(true));
    const files = await db.file.toArray();
    dispatch(isProcessing(false));
    return files;
  }, []);

  // useEffect(()=>{
  //   dispatch(fetchFilesAsync());
  // }, [filesToggle]);
  // console.log('filesFetched', filesFetched);
  return {
    dbFiles
  };
};

export {
  useHandleImportFiles,
  useHandleFilter,
  useLiveFetching
};
