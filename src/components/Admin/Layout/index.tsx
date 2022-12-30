import { Box } from '@mui/material';
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
    <Box sx={{ display: 'flex' }}>
      <Header sideBarWidth={sideBarWidth} isSideBarOpen={isSideBarOpen} />
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        setSideBarWidth={setSideBarWidth}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
