
import {  useDrop } from 'react-dnd';

import { useDispatch } from 'react-redux';
import { importFilesAsync } from 'redux/files/filesActions';

interface Props{
  children? : any,
  accept : any,
  name : string
}

const DragAndDropArea : React.FC<Props> = ({ 
  children,
  accept,
  name, 
}) => {


  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: accept,
    // item : {
    //   name : name
    // },
    drop: () => ({ name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  // console.log('isActive', isActive);
  // console.log('accept', accept);
  // console.log('otherProps', otherProps);

  return children(drop, isActive);
};

export default DragAndDropArea;
