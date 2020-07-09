import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TuneIcon from '@material-ui/icons/Tune';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { DrawerCPropsT } from './types'

const useStyles = makeStyles({
    list: {
        width: 200,
    }
});

export default (props: DrawerCPropsT) => {
    const isOpen = props.isOpen;
    const toggleOpen = props.toggleOpen;
    const userName = props.userName;

    const classes = useStyles();
    const history = useHistory();

    const handleOptions = () => {
        history.push('/options')
    }

    const handleSignOut = () => {

    }

    const handleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }

        toggleOpen(false);
    }

    return (
        <Drawer anchor='left' open={isOpen} onClick={handleDrawer} onKeyDown={handleDrawer}> {/* onClose={toggleDrawer(anchor, false)} */}
            <div className={classes.list}>
                <List>
                    <ListItem>
                        <ListItemText primary={userName} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={handleOptions}>
                        <ListItemIcon><TuneIcon /></ListItemIcon>
                        <ListItemText primary='Options' />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={handleSignOut}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary='Sign out' />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}