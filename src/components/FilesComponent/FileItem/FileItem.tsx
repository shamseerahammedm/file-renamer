import { ReactComponent as CloseIcon } from 'assets/images/icons/close.svg';

interface Props {
  removeItem? : ( fileId : string ) => void,
  fileId : string,
  fileExtension : string,
  imageSrcUrl : string,
  filename : string,
  fileSizeToShow : string,
}

const FileItem : React.FC<Props> = ({
  removeItem,
  fileId,
  fileExtension,
  imageSrcUrl,
  filename,
  fileSizeToShow
}) => {

  const isImage = (fileExtension === 'jpg' || fileExtension === 'jpeg' ) || fileExtension === 'png' || fileExtension === 'svg' ? true : false;

  return (
    <div className="ImageItem p-2 hello w-1/4">
      <div className="ImageItemWrapper rounded-lg overflow-hidden shadow-md relative" style={{ transform: 'translate(0, 0)' }}>
        <div 
          id={fileId} 
          onClick={() => removeItem ? removeItem(fileId) : null} 
          className="ImageItemClose w-4 h-4 rounded-full bg-white absolute shadow flex items-center justify-center cursor-pointer" 
          style={{ right: '6px', top: '6px' }}
        >
          <CloseIcon className="w-2 h-2"/>
        </div>
        <div className="ImageItemHeader">
          <div
            className={`ImageItemImage rounded-lg rounded-bl-none rounded-br-none h-32 ${!isImage && 'flex items-center justify-center'}`}
            style={{
              background: isImage ? `url(${imageSrcUrl}) center center/cover` : '#EDF2F7'
            }}
          >
            {isImage ? null : <p>File icon</p>}
          </div>
        </div>
        <div className="ImageItemContext px-4 py-2">
          <p className="text font-semibold ImageItemHeader text-sm">{filename}</p>
          <p className="text-sm font-light text-gray-600">{fileSizeToShow}</p>
        </div>
      </div>
    </div>
  );
};

export default FileItem;
