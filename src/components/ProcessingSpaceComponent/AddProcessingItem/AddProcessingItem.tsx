import { ReactComponent as AddProcessingItemIcon } from 'assets/images/icons/add-item.svg';
import Button from 'components/Common/Button/Button';

const AddProcessingItem = (props : any) => {
  return (
    <div className="add-processing-item w-full p-2 h-full" 
      {...props}
    >
      <Button 
        className="border border-dashed border-gray-500 rounded-lg h-full block w-full focus:outline-none py-10"
      >
        <AddProcessingItemIcon className="block mx-auto hover:border-white"/>
      </Button>
    </div>
  );
};

export default AddProcessingItem;
