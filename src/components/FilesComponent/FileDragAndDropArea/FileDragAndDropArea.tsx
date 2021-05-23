import { useHandleImportFiles } from '../Files/FilesHooks';
import { ReactComponent as EmptyDropZoneIcon } from 'assets/images/icons/storage-box.svg';
import { memo } from 'react';

const FileDragAndDropArea = () => {
  // handle import files from PC
  const { ref, isActive } = useHandleImportFiles();
  return (
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
  );
};

export default memo(FileDragAndDropArea);
