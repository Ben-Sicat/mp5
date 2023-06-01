import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IconButton } from '@mui/material';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

export default function DrawerMenu() {
  const [state, setState] = React.useState({
    left: false,
  });
  const router = useRouter();

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { title: 'MP 1', urlRedirect: 'taylor-approximation' },
          { title: 'MP 2', urlRedirect: 'root-finding' },
          { title: 'MP 3', urlRedirect: 'https://machinep3.netlify.app/' },
          { title: 'MP 4', urlRedirect: 'https://machineprob4.netlify.app/' },
        ].map((page, index) => (
          <ListItem key={page.title} disablePadding>
            <ListItemButton onClick={() => router.push(page.urlRedirect)}>
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignContent: 'center',
        height: '100vh',
        maxHeight: '70px',
        paddingRight: 3,
        backgroundColor: 'PURPLE',
      }}
    >
  {['right'].map(anchor => (
        <React.Fragment key={anchor}>
          <IconButton
            sx={{ color: 'white' }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}
