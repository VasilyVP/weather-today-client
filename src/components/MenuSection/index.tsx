import React, { useState } from 'react';
import { makeStyles, Typography, Hidden } from '@material-ui/core';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DrawerC from './DrawerC';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
}));

enum screens {
  small,
  large
}

export default () => {
  const classes = useStyles();

  //const [screen, setScreen] = useState(screens.large);
  const [auth, setAuth] = useState(true);

  //const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  //const open = Boolean(anchorEl);

  /*
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  */

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Hidden smUp>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <Typography variant="h6">
              Your weather today
            </Typography>
          </Hidden>
          <div className={classes.grow}></div>
          {auth ? <ExitToAppIcon /> : null /* <Button color="inherit">Sign out</Button> */}
        </Toolbar>
      </AppBar>
      <DrawerC />
    </>
  )
};