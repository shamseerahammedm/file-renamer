
import { memo } from 'react';
import ProcessingItem from '../ProcessingItem/ProcessingItem';
import addIcon from 'assets/images/icons/add-item.svg';
import AddProcessingItem from '../AddProcessingItem/AddProcessingItem';
import clsx from 'clsx';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { makeFolders } from 'redux/files/filesActions';
import { v4 as uuidv4 } from 'uuid';
import DragAndDropArea from 'components/DragAndDropComponent/DragAndDropArea/DragAndDropArea';

const ProcessingSpace: React.FC = () =>
{
  const dispatch = useDispatch();
  const { folders } = useSelector((state: RootStateOrAny) => state.files);
  const isProcessingSpaceEmpty = folders.length === 0;

  const createFolderHandler = () =>
  {
    const currentFolderList = [...folders];
    const folderDetails = { folderId: uuidv4(), type: 'zip', files: [], name: 'Default Zip FolderName', numberOfFiles: 0 };
    currentFolderList.push(folderDetails);
    dispatch(makeFolders(currentFolderList));
  };

  return (
    <div>
      <div className="processing-space px-2 mt-4">
        <h2 className="font-medium mb-1">Processing Space</h2>
        <div className="processing-space__wrapper rounded w-full shadow-sm bg-white ">
          <div className="processing-space__content p-3 flex flex-wrap">
            <div className="w-full sm:w-11/12">
              <div className={clsx(
                'flex h-full overflow-auto',
                isProcessingSpaceEmpty && 'items-center justify-center'
              )}>
                {
                  isProcessingSpaceEmpty
                    ?
                    <p className="text-center text-gray-600 text-sm">No ZIP folders click on the <img src={addIcon} className="inline-block h-auto w-5 object-cover" alt="add button icon" /> icon to make one, and drag and drop the files inside them</p>
                    :
                    folders.map((folderItem: any, index: number) => (
                      <div className="w-full sm:w-2/12" key={index}>
                        <DragAndDropArea
                          accept="abcd"
                        >
                          {(ref : any, isActive : boolean)=>(
                            <ProcessingItem
                              type={folderItem.type}
                              name={folderItem.name}
                              numberOfFiles={folderItem.numberOfFiles}
                              folderId={folderItem.folderId}
                              ref={ref}
                              isActive={isActive}
                            />
                          )}
                        </DragAndDropArea>
                      </div>
                    ))
                }
              </div>

            </div>
            <div className="w-full sm:w-1/12">
              <AddProcessingItem onClick={createFolderHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProcessingSpace);