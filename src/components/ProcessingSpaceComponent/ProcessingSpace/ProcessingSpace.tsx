
import { memo } from 'react';
import ProcessingItem from '../Folder/Folder';
import addIcon from 'assets/images/icons/add-item.svg';
import AddProcessingItem from '../AddProcessingItem/AddProcessingItem';
import clsx from 'clsx';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { makeFolders } from 'redux/files/filesActions';
import { v4 as uuidv4 } from 'uuid';
import { folder } from 'utils/modals';

const ProcessingSpace: React.FC = () => {
  const dispatch = useDispatch();
  const { folders } = useSelector((state: RootStateOrAny) => state.files);
  const isProcessingSpaceEmpty = folders.length === 0;

  const createFolderHandler = () => {
    // const currentFolderList : folder = [...folders];
    // const folderDetails : folder = {
    //   folderId: uuidv4(),
    //   type: 'zip',
    //   files: [],
    //   name: 'Folder',
    //   numberOfFiles: 0
    // };
    // currentFolderList.push(folderDetails);
    // dispatch(makeFolders(currentFolderList));
  };

  return (
    <div>
      <div className="processingSpace px-2 mt-4">
        <h2 className="font-medium mb-1">Processing Space</h2>
        <div className="processingSpaceWrapper rounded w-full shadow-sm bg-white ">
          <div className="processingSpaceContent p-3 flex flex-wrap">
            <div className="w-full sm:w-5/6 md:w-11/12">
              <div className={clsx(
                'flex h-full overflow-auto',
                isProcessingSpaceEmpty && 'items-center justify-center'
              )}>
                {
                  isProcessingSpaceEmpty
                    ?
                    <p className="text-center text-gray-600 text-sm">No ZIP folders click on the <img src={addIcon} className="inline-block h-auto w-5 object-cover" alt="add button icon" /> icon to make one, and drag and drop the files inside them</p>
                    :
                    folders.map((folderItem: any, index: number) => {
                      return (
                        <div className="w-full md:w-3/12 lg:w-2/12" key={index}>
                          <ProcessingItem
                            type={folderItem.type}
                            name={`${folderItem.name} ${index}`}
                            numberOfFiles={folderItem.numberOfFiles}
                            folderId={folderItem.folderId}
                          />
                        </div>
                      );
                    })
                }
              </div>
            </div>
            <div className="w-full sm:w-1/6 md:w-1/12">
              <AddProcessingItem onClick={createFolderHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProcessingSpace);