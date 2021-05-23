import LeftMenu from 'components/LeftMenuComponent/LeftMenu/LeftMenu';
import './Layout.scss';
interface LayoutProps{
  children : any
}

const Layout : React.FC<LayoutProps> = (props) => {
  return (
    <div className="layout min-h-screen bg-gray-200">
      <LeftMenu />
      <div className="layoutContainer w-full px-4 py-4 ">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
