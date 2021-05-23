import { ReactComponent as EmptyDropZoneIcon } from 'assets/images/icons/storage-box.svg';
import { memo } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import FileItem from '../FileItem/FileItem';
import clsx from 'clsx';
import { useHandleFilter, useHandleImportFiles, useLiveFetching } from './FilesHooks';
import CheckBoxButton from 'components/Common/CheckBoxButton/CheckBoxButton';

import { db } from 'App';
import { getFileSizeToShow } from 'utils/utils';

const Files: React.FC = () => {
  const { files } = useSelector((state: RootStateOrAny) => state.files);
  const removeItem = (fileId: any) => db.file.delete(fileId);

  // handle import files from PC
  const { ref, isActive } = useHandleImportFiles();

  // handling filter
  const { itemsPicked, uniqueFilterTags, handleChange } = useHandleFilter();

  // handle live fetching 
  
  const { dbFiles } =  useLiveFetching();

  return (

    <div className="files px-2 mt-4 ">
      <h2 className="font-medium mb-1">Files</h2>
      <div className="files__wrapper rounded-lg w-full shadow-sm  overflow-hidden bg-white">
        <div className="files__header p-3 border-b border-gray-300 flex">
          <div className="w-full sm:w-8/12 flex items-center">
            <span className="text-sm uppercase text-gray-600 mr-2">Filter by type : </span>
            {uniqueFilterTags.map((tagItem: any) => (
              <CheckBoxButton
                handleChange={handleChange}
                value={tagItem.fileExtension}
                label={tagItem.fileExtension}
                key={tagItem.fileId}
                itemsPicked={itemsPicked}
              />
            ))}
          </div>
          <div className="w-full sm:w-4/12 flex items-center justify-end">
          </div>
        </div>
        <div className="files__content flex ">
          <div className={clsx(
            'w-full sm:w-9/12 flex flex-wrap justify-center',
            !(files && files.length > 0) && 'items-center'
          )}>
            {
              dbFiles && dbFiles.length > 0
                ?
                dbFiles.map((item: any, i: number) => {
                  return (
                    <FileItem
                      fileId={item.fileId}
                      fileExtension={item.extension}
                      imageSrcUrl={URL.createObjectURL(item.fileBlob)}
                      filename={item.fileBlob.name}
                      fileSizeToShow={getFileSizeToShow(item.fileBlob.size)}
                      removeItem={removeItem}
                      key={item.fileId}
                      isImage={item.isImage}
                    />
                  );
                })
                :
                <p className="text-center text-gray-500 text-sm">No files added</p>
            }
          </div>
          <div className="w-full sm:w-3/12 m-2 border border-dashed border-gray-500 rounded-md flex items-center justify-center " ref={ref}>
            <div className="dragAndDropArea">
              <div className="drop-area bg-white w-full ">
                <div className="drop-area__wrapper py-3 h-full w-full px-2">
                  <span className="flex mx-auto justify-center">
                    <EmptyDropZoneIcon className="h-auto w-8 object-cover" />
                  </span>
                  <h2 className="text-center font-medium text-gray-700 mt-2">Add your files </h2>
                  <p className="text-center text-gray-500 text-sm">
                    {isActive ? 'Release file to drop ' : 'Drag and drop files here'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Files);
