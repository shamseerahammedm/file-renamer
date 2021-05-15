
import {  useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { setFilesAsync } from 'redux/files/filesActions';

interface Props{
  children? : any
}

const DragAndDropArea : React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const [{ canDrop, isOver, ...otherProps }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop: (item:any, monitor) => {
      dispatch(setFilesAsync(item.files));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  console.log('otherProps', otherProps);

  const isActive = canDrop && isOver;

  return (
    <>
      {children(drop, isActive)}
    </>
  );
};

export default DragAndDropArea;
