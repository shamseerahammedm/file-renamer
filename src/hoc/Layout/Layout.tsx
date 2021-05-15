import LeftMenu from 'components/LeftMenuComponent/LeftMenu/LeftMenu';

interface LayoutProps{
  children : any
}

const Layout : React.FC<LayoutProps> = (props) => {
  return (
    <div className="flex flex-wrap min-h-screen bg-gray-200">
      <LeftMenu />
      <div className="w-full sm:w-11/12 px-4 py-4 md:-ml-5 lg:-ml-10">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
