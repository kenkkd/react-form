import { ReactNode, useState } from 'react';
import Header from '../Header';
import SideBar from '../SideBar';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [sideBarWidth, setSideBarWidth] = useState<number>(0);

  return (
    <>
      <Header sideBarWidth={sideBarWidth} isSideBarOpen={isSideBarOpen} />
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        setSideBarWidth={setSideBarWidth}
      />
      {children}
    </>
  );
};

export default Layout;
