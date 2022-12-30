import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

type Props = {
  isSideBarOpen: boolean;
  sideBarWidth: number;
};

const Header = ({ isSideBarOpen, sideBarWidth }: Props) => {
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    width: `calc(100% - ${sideBarWidth}px)`,
    ...(open && {
      marginLeft: sideBarWidth,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    ...(!open && {
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }),
  }));

  return (
    <AppBar position="fixed" open={isSideBarOpen}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          管理画面
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
