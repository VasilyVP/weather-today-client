import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import { FormControl, FormGroup, FormControlLabel, Switch, Button, IconButton, Divider } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import DeleteIcon from '@material-ui/icons/Delete'
import { rootStateT } from '../store/types'
import { changeSystem, changePressure, changeHumidity, changeTheme, deleteAccount } from '../actions'
import { systems, themes } from '../common/consts'

export default () => {
    const { system, pressure, humidity, theme } = useSelector((state: rootStateT) => state.options);
    const auth = useSelector((state: rootStateT) => state.authentication.firstName);

    const dispatch = useDispatch();
    const history = useHistory();

    const systemChecked = system === systems.metric ? true : false;
    const systemLabel = system === systems.metric ? 'Metric system' : 'Imperial system';
    const themeSwitch = theme === themes.light ? false : true;
    const themeLabel = theme === themes.light ? 'Light theme' : 'Dark theme';

    const handleBack = () => history.push('/');
    const handleSystem = () => dispatch(changeSystem());
    const handlePressure = () => dispatch(changePressure());
    const handleHumidity = () => dispatch(changeHumidity());
    const handleTheme = () => dispatch(changeTheme());
    const handleDeleteAccount = () => dispatch(deleteAccount());

    return (
        <>
            <Box mt={2}>
                <IconButton onClick={handleBack}><ArrowBackIosIcon /></IconButton>
            </Box>
            <Box px={5}>
                <Box display="flex" my={2}>
                    <Box fontSize="h6.fontSize">
                        Options:
                    </Box>
                </Box>
                <FormControl component="fieldset">
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={systemChecked} onChange={handleSystem} name="system" />}
                            label={systemLabel}
                        />
                        <FormControlLabel
                            control={<Switch checked={pressure} onChange={handlePressure} name="pressure" />}
                            label="Pressure"
                        />
                        <FormControlLabel
                            control={<Switch checked={humidity} onChange={handleHumidity} name="humidity" />}
                            label="Humidity"
                        />
                        <FormControlLabel
                            control={<Switch checked={themeSwitch} onChange={handleTheme} name="theme" />}
                            label={themeLabel}
                        />
                        {auth ?
                            <>
                                <Box my={2} ><Divider /></Box>
                                <Button
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleDeleteAccount}
                                >
                                    Delete account
                                </Button>
                            </>
                            : null}
                    </FormGroup>
                </FormControl>
            </Box>
        </>
    )
}