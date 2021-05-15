import zipIcon from 'assets/images/icons/zip.svg';
import folderIcon from 'assets/images/icons/folder.svg';
import { ReactComponent as CloseIcon } from 'assets/images/icons/close.svg';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { makeFolders } from 'redux/files/filesActions';
import { forwardRef } from 'react';

const textGenerator = (numberOfFiles : number, isActive : boolean) => {
  if(numberOfFiles > 0)
  {
    if(isActive)
    {
      return 'Drop here';
    }
    else
    {
      return `${numberOfFiles} Files`;
    }
  }
  else
  {
    return 'Empty';
  }
};

interface ProcessingItemProps {
    type : string;
    name : string;
    numberOfFiles : number;
    folderId : string;
    ref : any;
    isActive : boolean;
}

const ProcessingItem: React.FC<ProcessingItemProps> = forwardRef(({
  type,
  name,
  numberOfFiles,
  folderId,
  isActive 
}, ref: any ) => {

  const dispatch = useDispatch();
  const { folders } = useSelector((state: RootStateOrAny) => state.files);
  
  const removeFolderHandler = (folderId : string) => {
    const newFoldersArray = folders.filter((folderItem : {
      folderId : string
    }) => folderItem.folderId !== folderId);
    dispatch(makeFolders(newFoldersArray));
  };

  return (
    <div className="processing-item w-full p-2" ref={ref}>
      <div style={{ background : '#EBF2FC' }} className="processing-item__wrapper rounded-lg px-4 py-5 relative">
        <div 
          onClick={()=>removeFolderHandler(folderId)} 
          className="ImageItemClose w-4 h-4 rounded-full bg-white absolute shadow flex items-center justify-center cursor-pointer" 
          style={{ right: '6px', top: '6px' }}
        >
          <CloseIcon className="w-2 h-2"/>
        </div>
        <div className="processing-item__icon">
          {
            type === 'zip' 
              ?
              <img className="w-7 h-auto object-cover mb-1" src={zipIcon} alt="zip"/>
              :
              <img className="w-7 h-auto object-cover mb-1" src={folderIcon} alt="folder"/>
          }
        </div>
        
        <h3 style={{ color : '#26327F' }} className="processing-item font-semibold">{name}</h3>
        <div className="processing-item__files text-xs text-gray-600">
          {
            textGenerator(numberOfFiles, isActive)
          }
        </div>
      </div>
    </div>
  );
});

export default ProcessingItem;
