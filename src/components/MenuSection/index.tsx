import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { makeStyles, Typography, Hidden, Box } from '@material-ui/core';
import { AppBar, Toolbar, IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import TuneIcon from '@material-ui/icons/Tune';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DrawerC from './DrawerC';
import { rootStateT } from '../../store/types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  }
}));

export default () => {
  const classes = useStyles();
  const userName = useSelector((state: rootStateT) => state.authentication.userName);

  const [isOpenMenu, setMenu] = useState(false);
  const history = useHistory();

  const handleOptions = () => history.push('/options');
  const handleMenu = () => setMenu(state => !state);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Hidden smUp>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <Typography variant="h6">
              Your weather today{userName ? `, ${userName}!` : null}
            </Typography>
          </Hidden>
          <div className={classes.grow}></div>
          <Hidden smDown>
            <Box mx={1}>
              <Tooltip title="Settings">
                <IconButton onClick={handleOptions} color="inherit">
                  <TuneIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box mx={1}>
              {
                userName ?
                  <Tooltip title="Sign out">
                    <IconButton color="inherit"><ExitToAppIcon /></IconButton>
                  </Tooltip>
                  : null
              }
            </Box>
          </Hidden>
        </Toolbar>
      </AppBar>
      <DrawerC isOpen={isOpenMenu} toggleOpen={setMenu} userName={userName} />
    </>
  )
};