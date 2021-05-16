import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { setFilesAsync } from 'redux/files/filesActions';

const useHandleImportFiles = () => {

  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    item : {
      name : 'filesDropArea'
    },
    drop: (item:any, monitor) => {
      dispatch(setFilesAsync(item.files));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return {
    ref : drop,
    isActive
  };
};

export {
  useHandleImportFiles
};