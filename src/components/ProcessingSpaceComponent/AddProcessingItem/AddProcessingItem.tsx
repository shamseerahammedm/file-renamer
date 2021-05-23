import { ReactComponent as AddProcessingItemIcon } from 'assets/images/icons/add-item.svg';
import Button from 'components/Common/Button/Button';
import './AddProcessingItem.scss'; 

const AddProcessingItem = (props : any) => {
  return (
    <div 
      className="addProcessingItem w-full p-2 h-full" 
      {...props}
    >
      <Button 
        className="border border-dashed border-gray-500 rounded-lg h-full block w-full focus:outline-none py-10 px-2"
      >
        <AddProcessingItemIcon className="addIcon block mx-auto hover:border-white"/>
      </Button>
    </div>
  );
};

export default AddProcessingItem;
