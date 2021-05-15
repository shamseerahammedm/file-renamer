import Logo from '../../Logo/Logo';
import LeftMenuItems from '../LeftMenuItems/LeftMenuItems';
import DotLoader from 'components/Common/DotLoader/DotLoader';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { selectIsLoading } from '../../redux/files/files.selectors';

const LeftMenu = ({ ...otherProps }) => {
  return (
    <div className="w-full sm:w-1/12 left-menu " {...otherProps}>
      <div className="left-menu__wrapper md:mr-3 lg:mr-10 flex flex-col items-center justify-between  h-full" style={{ background : '#5864FF' }}>
        <div className="left-menu__upper">
          <Logo/>
          <LeftMenuItems/>
        </div>
        <div className="left-menu__lower pb-4">
          <DotLoader className="loader-wrapper"/>
          {/* {
            isLoading && <DotLoader className="loader-wrapper"/>
          } */}
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   isLoading : selectIsLoading
// });

// export default connect(mapStateToProps)(LeftMenu);

export default LeftMenu;