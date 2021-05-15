import Button from 'components/Common/Button/Button';
import Input from 'components/Common/Input/Input';
import { ReactComponent as SearchIcon } from 'assets/images/icons/search.svg';

const SearchBar = () => {
  return (
    <div className="search-bar w-full relative">
      <Input type="text" placeholder="Search for files" />
      <Button 
        style={{ right:'5px', top : '5px', background : '#4957EC' }} 
        className="flex items-center search-button py-2 px-2 rounded rounded-md outline-none focus:outline-none absolute top-0 right-0" 
      >
        <SearchIcon className="w-4 h-4 object-cover inline-block outline-none"/>
      </Button>
    </div>
  );
};

export default SearchBar;
