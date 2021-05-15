import zipIcon from 'assets/images/icons/zip.svg';
import folderIcon from 'assets/images/icons/folder.svg';

interface ProcessingItemProps {
    type : string;
    name : string;
    numberOfFiles : number;
}

const ProcessingItem: React.FC<ProcessingItemProps> = ({ type, name, numberOfFiles }) => {

  console.log(type);

  return (
    <div className="processing-item w-full p-2">
      <div style={{ background : '#EBF2FC' }} className="processing-item__wrapper rounded-lg px-4 py-5">
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
        <div className="processing-item__files text-xs text-gray-600">{numberOfFiles === 0 ? 'Empty Folder' : numberOfFiles}</div>
      </div>
    </div>
  );
};

export default ProcessingItem;
