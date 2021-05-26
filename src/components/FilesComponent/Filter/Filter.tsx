import CheckBoxButton from 'components/Common/CheckBoxButton/CheckBoxButton';
import { useHandleFilter } from '../Files/FilesHooks';

const Filter = () => {
  // handling filter
  const { itemsPicked, uniqueFilterTags, handleChange } = useHandleFilter();
  return (
    <div className="files__header p-3 border-b border-gray-300 flex">
      <div className="w-full sm:w-8/12 flex items-center">
        <span className="text-sm uppercase text-gray-600 mr-2">Filter by type : </span>
        {uniqueFilterTags.map((tagItem: any) => (
          <CheckBoxButton
            handleChange={handleChange}
            value={tagItem.extension}
            label={tagItem.extension}
            key={tagItem.fileId}
            itemsPicked={itemsPicked}
          />
        ))}
      </div>
    </div>
  );
};

export default Filter;
