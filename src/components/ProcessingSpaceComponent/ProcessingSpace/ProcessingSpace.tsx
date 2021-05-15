
import { useCallback, useState, useEffect } from 'react';
import ProcessingItem from '../ProcessingItem/ProcessingItem';
import addIcon from 'assets/images/icons/add-item.svg';
import AddProcessingItem from '../AddProcessingItem/AddProcessingItem';

interface ProcessingSpaceProps
{
  folders?: Array<any>;
}

const ProcessingSpace: React.FC<ProcessingSpaceProps> = ({
  folders = []
}) =>
{

  const [isProcessingSpaceEmpty, setIsProcessingSpaceEmpty] = useState(true);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfNormalFolders, setNumberOfNormalFolders] = useState(0);
  const [numberOfZipFolders, setNumberOfZipFolders] = useState(0);

  // component did mount
  useEffect(() =>
  {
    if (folders.length > 0)
    {
      setIsProcessingSpaceEmpty(false);
    }
    else
    {
      setIsProcessingSpaceEmpty(true);
    }
  }, [folders.length]);

  const makeFolderTypesHandler = useCallback(() =>
  {
    setIsLoading(true);
    let folderData: any[] = [];
    // making zip folder with count from state
    for (let i = 0; i < numberOfZipFolders; i++)
    {
      folderData = [...folderData, { type: 'zip', files: [], name: 'Default Zip FolderName', numberOfFiles: 0 }];
    }
    // making normal folder with count from state
    for (let i = 0; i < numberOfNormalFolders; i++)
    {
      folderData = [...folderData, { type: 'normalFolder', files: [], name: 'Default Folder Name', numberOfFiles: 0 }];
    }
    // console.log(folderData);
    // makeFolders(folderData);
    setIsLoading(false);
    setIsModalShown(false);
    setIsProcessingSpaceEmpty(false);
  }, [numberOfZipFolders, numberOfNormalFolders]);

  const closeModalHandler = () => setIsModalShown(false);
  const showModalHandler = () => setIsModalShown(true);

  const changeHandler = useCallback((value, folderType) =>
  {
    if (folderType === 'normalfolder')
    {
      setNumberOfNormalFolders(value);
    }
    else
    {
      setNumberOfZipFolders(value);
    }
  }, []);

  return (
    <div>
      <div className="processing-space px-2 mt-4">
        <h2 className="font-medium mb-1">Processing Space</h2>
        <div className="processing-space__wrapper rounded w-full shadow-sm bg-white ">
          <div className="processing-space__content p-3 flex flex-wrap">
            <div className="w-full sm:w-11/12">
              <div className={`flex h-full ${isProcessingSpaceEmpty && 'items-center justify-center'}`}>
                {
                  isProcessingSpaceEmpty
                    ?
                    <p className="text-center text-gray-600 text-sm">No ZIP folder or Normal folder, click on the <img src={addIcon} className="inline-block h-auto w-5 object-cover" alt="add button icon" /> icon to make one, and drag and drop the files inside them</p>
                    :
                    (

                      folders.map(folderItem =>
                      {
                        return (
                          // <div className="w-full sm:w-2/12"><ProcessingItem type="folder" /></div>
                          <div className="w-full sm:w-2/12"><ProcessingItem type={folderItem.type} name={folderItem.name} numberOfFiles={folderItem.numberOfFiles} /></div>
                        );
                      })

                    )
                }
              </div>

            </div>
            <div className="w-full sm:w-1/12">
              <AddProcessingItem onClick={() => showModalHandler()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingSpace;