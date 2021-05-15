
import {  useDrop } from 'react-dnd';

import { useDispatch } from 'react-redux';
import { setFilesAsync } from 'redux/files/filesActions';

interface Props{
  children? : any,
  accept : any
}

const DragAndDropArea : React.FC<Props> = ({ 
  children,
  accept 
}) => {

  const dispatch = useDispatch();
  const [{ canDrop, isOver, ...otherProps }, drop] = useDrop(() => ({
    accept: accept,
    drop: (item:any, monitor) => {
      dispatch(setFilesAsync(item.files));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  console.log('accept', accept);
  console.log('otherProps', otherProps);

  const isActive = canDrop && isOver;

  return (
    <>
      {children(drop, isActive)}
    </>
  );
};

export default DragAndDropArea;
