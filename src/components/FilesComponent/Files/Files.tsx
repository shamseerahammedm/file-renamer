import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ReactComponent as EmptyDropZoneIcon } from 'assets/images/icons/storage-box.svg';

interface Props {
  
}

const Files : React.FC<Props> = ({

}) => {
  return (
    <div className="files px-2 mt-4 ">
      <h2 className="font-medium mb-1">Files</h2>
      <div className="files__wrapper rounded-lg w-full shadow-sm  overflow-hidden bg-white">
        <div className="files__header p-3 border-b border-gray-300 flex">
          <div className="w-full sm:w-8/12 flex items-center">
            <span className="text-sm uppercase text-gray-600 mr-2">Filter by type : </span>

          </div>
          <div className="w-full sm:w-4/12 flex items-center justify-end">

          </div>
        </div>

        <div className="files__content flex flex-wrap">
          <div className="w-full sm:w-9/12 flex flex-wrap items-center justify-center">
            {
              true
                ?
                <p className="text-center text-gray-500 text-sm">No files added</p>
                :
                <p className="text-center text-gray-500 text-sm">files added</p>
            }
          </div>
          <div className="w-full sm:w-3/12 p-2">
            <DndProvider backend={HTML5Backend}>
              <div  className="drop-area bg-white w-full h-full rounded-md border border-dashed border-gray-500 flex items-center justify-center">
                <div className="drop-area__wrapper py-3">
                  <span className="flex mx-auto justify-center">
                    <EmptyDropZoneIcon className="h-auto w-8 object-cover"/>
                  </span>
                  <h2 className="text-center font-medium text-gray-700 mt-2">Add your files </h2>
                  <p className="text-center text-gray-500 text-sm">
                    { true ? 'Release file to drop ' : 'Drag and drop files here' }
                  </p>
                </div>
              </div>
            </DndProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
