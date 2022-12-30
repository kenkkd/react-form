import { ReactNode, useEffect } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

type SideBarItem = {
  name: string;
  link: string;
  icon: ReactNode;
};

const sideBarItems: SideBarItem[] = [
  {
    name: 'フロント',
    link: '',
    icon: <HomeIcon />,
  },
  {
    name: 'ダッシュボード',
    link: '',
    icon: <DashboardIcon />,
  },
  {
    name: '問い合わせ',
    link: '/admin/contact',
    icon: <MailIcon />,
  },
];

const drawerCloseWidth = 65;
const drawerOpenWidth = 230;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerOpenWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerOpenWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

type Props = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isSideBarOpen: boolean) => void;
  setSideBarWidth: (sideBarWidth: number) => void;
};

const SideBar = ({
  isSideBarOpen,
  setIsSideBarOpen,
  setSideBarWidth,
}: Props) => {
  const handleSideBarOpen = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  useEffect(
    () =>
      // サイドバーの開閉のタイミングでヘッダーの横幅も動的に変えるために使用
      isSideBarOpen
        ? setSideBarWidth(drawerOpenWidth)
        : setSideBarWidth(drawerCloseWidth),
    [isSideBarOpen]
  );

  return (
    <Drawer variant="permanent" open={isSideBarOpen}>
      <List>
        <ListItem onClick={handleSideBarOpen}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isSideBarOpen ? 'initial' : 'center',
              px: 2,
            }}
          >
            {isSideBarOpen ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
          </ListItemButton>
        </ListItem>
        {sideBarItems.map((item) => (
          <Link key={item.name} to={item.link} style={{ color: '#000000DE' }}>
            <ListItem>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    marginLeft: isSideBarOpen ? 1.5 : 0,
                    opacity: isSideBarOpen ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
