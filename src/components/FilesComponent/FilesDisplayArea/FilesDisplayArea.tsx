import clsx from 'clsx';
import { getFileSizeToShow } from 'utils/utils';
import FileItem from '../FileItem/FileItem';

interface props{
  files : Array<any>,
  removeItem : any
}

const FilesDisplayArea : React.FC<props> = ({
  files,
  removeItem
}) => {
  return (
    <div className={clsx(
      'w-full sm:w-9/12 flex flex-wrap ',
      !(files && files.length > 0) && 'items-center'
    )}>
      {
        files && files.length > 0
          ?
          files.map((item: any, i: number) => {
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
  );
};

export default FilesDisplayArea;
