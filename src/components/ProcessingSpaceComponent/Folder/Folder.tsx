import zipIcon from 'assets/images/icons/zip.svg';
import folderIcon from 'assets/images/icons/folder.svg';
import { ReactComponent as CloseIcon } from 'assets/images/icons/close.svg';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { makeFolders } from 'redux/files/filesActions';
import { useDrop } from 'react-dnd';
import { itemTypes } from 'utils/constants';
import { toast } from 'react-toastify';

const textGenerator = (numberOfFiles: number, isActive: boolean) => {
  if (isActive) {
    return 'Drop here';
  }
  else {
    if (numberOfFiles > 0) {
      return `${numberOfFiles} Files`;
    }
    else {
      return 'Empty';
    }
  }
};

interface Props {
  type: string;
  name: string;
  numberOfFiles: number;
  folderId: string;
}

const Folder: React.FC<Props> = ({
  type,
  name,
  numberOfFiles,
  folderId,
}) => {
  const dispatch = useDispatch();
  const { folders } = useSelector((state: RootStateOrAny) => state.files);
  
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: itemTypes.DROPPED_FILE,
    drop: (item: any) => dropHandler(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  const removeFolderHandler = (folderId: string) => {
    const newFoldersArray = folders.filter((folderItem: {
      folderId: string
    }) => folderItem.folderId !== folderId);
    dispatch(makeFolders(newFoldersArray));
  };

  const dropHandler = (item : any) => {
    if (item) {
      const alertDiv = (
        <div className="text-black">
          You dropped <span>{item.name}</span> into {name}
        </div>
      );
      toast(alertDiv, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <div
      className="Folder w-full p-2"
      ref={drop}
    >
      <div
        style={{ background: isActive ? 'rgb(197 221 255)' : '#EBF2FC' }}
        className="FolderWrapper rounded-lg px-4 py-5 relative"
      >
        <div
          onClick={() => removeFolderHandler(folderId)}
          className="ImageItemClose w-4 h-4 rounded-full bg-white absolute shadow flex items-center justify-center cursor-pointer"
          style={{ right: '6px', top: '6px' }}
        >
          <CloseIcon className="w-2 h-2" />
        </div>
        <div className="FolderIcon">
          {
            type === 'zip'
              ?
              <img className="w-7 h-auto object-cover mb-1" src={zipIcon} alt="zip" />
              :
              <img className="w-7 h-auto object-cover mb-1" src={folderIcon} alt="folder" />
          }
        </div>

        <h3 style={{ color: '#26327F' }} className=" font-semibold">{name}</h3>
        <div className="FolderFiles text-xs text-gray-600">{textGenerator(numberOfFiles, isActive)}</div>
      </div>
    </div>
  );
};

export default Folder;
