import './CheckBoxButton.scss';

interface Props{
  handleChange : (e: React.ChangeEvent<HTMLInputElement>) => any;
  value : string | number,
  label : string,
  itemsPicked : Array<any>
}

const CheckBoxButton : React.FC<Props> = ({
  handleChange,
  value,
  label,
  itemsPicked
}) => {

  return (
    <div className="CheckBoxButton">
      <label className="CheckBoxButtonInner">
        <input onChange={handleChange} type="checkbox" value={value} checked={itemsPicked.includes(value)}/>
        <span className="uppercase">{label}</span>
      </label>
    </div>
  );
};

export default CheckBoxButton;
