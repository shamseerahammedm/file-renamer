import Logo from '../../Logo/Logo';
import LeftMenuItems from '../LeftMenuItems/LeftMenuItems';
import DotLoader from 'components/Common/DotLoader/DotLoader';
import { useSelector, RootStateOrAny } from 'react-redux';
import'./LeftMenu.scss';

const LeftMenu = ({ ...otherProps }) => {
  const { isProcessing } = useSelector((state: RootStateOrAny) => state.files);
  return (
    <div className="leftMenu" {...otherProps}  style={{ background : '#5864FF' }}>
      <div className="leftMenuWrapper flex flex-col items-center justify-between h-screen fixed left-0 right-0 bottom-0 top-0" >
        <div className="leftMenuUpper">
          <Logo/>
          <LeftMenuItems/>
        </div>
        <div className="leftMenuLower pb-4">
          {
            true
            &&
            <DotLoader className="loader-wrapper"/>
          }
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;