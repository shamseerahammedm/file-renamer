import { db } from 'App';
import Button from 'components/Common/Button/Button';
import Files from 'components/FilesComponent/Files/Files';
import ProcessingSpace from 'components/ProcessingSpaceComponent/ProcessingSpace/ProcessingSpace';
import SearchBar from 'components/Searchbar/Searchbar';
import Layout from 'hoc/Layout/Layout';

const HomePage = () => {

  const deleteHandler = () => {
    db.delete();
  };

  return (
    <Layout>
      <button onClick={deleteHandler}>Delete</button>
      <div className="flex">
        <div className="w-full sm:w-8/12 lg:w-10/12 px-2">
          <SearchBar/>
        </div>
        <div className="w-full sm:w-4/12 lg:w-2/12  px-2">
          <Button 
            style={{ background : '#4957EC' }}
            className="shadow-md hover:shadow-lg flex items-center justify-center w-full text-white search-button py-2 px-2 rounded rounded-md outline-none focus:outline-none">
              Select All Files
          </Button>
        </div>
      </div>
      <ProcessingSpace />
      <Files/>
    </Layout>
  );
};

export default HomePage;
