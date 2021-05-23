import { memo } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import FileItem from '../FileItem/FileItem';
import clsx from 'clsx';
import { useHandleFilter, useLiveFetching } from './FilesHooks';
import CheckBoxButton from 'components/Common/CheckBoxButton/CheckBoxButton';
import { db } from 'App';
import { getFileSizeToShow } from 'utils/utils';
import FileDragAndDropArea from '../FileDragAndDropArea/FileDragAndDropArea';
import Filter from '../Filter/Filter';
import FilesDisplayArea from '../FilesDisplayArea/FilesDisplayArea';

const Files: React.FC = () => {
  const removeItem = (fileId: any) => db.file.delete(fileId);
  // handle live fetching 
  const { dbFiles } =  useLiveFetching();
  return (
    <div className="files px-2 mt-4 ">
      <h2 className="font-medium mb-1">Files</h2>
      <div className="files__wrapper rounded-lg w-full shadow-sm  overflow-hidden bg-white">
        <Filter/>
        <div className="files__content flex ">
          {
            dbFiles && dbFiles.length > 0
            &&
            <FilesDisplayArea
              files={dbFiles}
              removeItem={removeItem}
            />
          }
          <FileDragAndDropArea/>
        </div>
      </div>
    </div>
  );
};

export default memo(Files);
