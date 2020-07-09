import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import { FormControl, FormGroup, FormControlLabel, Switch, IconButton } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { systems } from '../common/consts'
import { rootStateT } from '../store/types'
import { changeSystem, changePressure, changeHumidity } from '../actions'

export default () => {
    const { system, pressure, humidity } = useSelector((state: rootStateT) => state.options);

    const dispatch = useDispatch();
    const history = useHistory();

    const systemChecked = system === systems.metric ? true : false;
    const systemLabel = system === systems.metric ? 'Metric system' : 'Imperial system';

    const handleBack = () => history.push('/');
    const handleSystem = () => dispatch(changeSystem());
    const handlePressure = () => dispatch(changePressure());
    const handleHumidity = () => dispatch(changeHumidity());

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
                    </FormGroup>
                </FormControl>
            </Box>
        </>
    )
}