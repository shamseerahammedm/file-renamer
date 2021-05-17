import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setFilesAsync, updateFilesAfterFiltering } from 'redux/files/filesActions';

const useHandleImportFiles = () =>
{
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

const useHandleFilter = () =>
{
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

export
{
  useHandleImportFiles,
  useHandleFilter
};
