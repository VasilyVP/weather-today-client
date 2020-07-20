import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Paper, Divider } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { rootStateT } from '../store/types'
//import { weatherProps } from '../common/types'
import WeatherForecast from './WeatherForecast'
//import { changeServiceAvailable } from '../actions'
import { systems } from '../common/consts'
import { getWeather, changeServiceAvailable } from '../actions';
import { alignWeatherNow } from '../common/utils'

const useStyles = makeStyles((theme: Theme) => createStyles({
    grid: {
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    img: {
        width: '150px'
    }
}))

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const firstName = useSelector((state: rootStateT) => state.authentication.firstName);
    const system = useSelector((state: rootStateT) => state.options.system);
    const pressure = useSelector((state: rootStateT) => state.options.pressure);
    const humidity = useSelector((state: rootStateT) => state.options.humidity);
    const serviceAvailable = useSelector((state: rootStateT) => state.services.serviceAvailable);

    const weatherState = useSelector((state: rootStateT) => state.weather);

    const city = weatherState.city;

    // unit system changes and rounding values
    const weather = alignWeatherNow(weatherState.now, system);

    useEffect(() => {
        if (!city) dispatch(getWeather()); //serviceAvailable && 
        if (!serviceAvailable && city) dispatch(changeServiceAvailable());
    }, [city]);

    return (
        <>
            {city ?
                <Box my={3}>
                    <Grid container direction="column" alignItems="center" spacing={2}>
                        <Grid item>
                            <Typography variant="h6">{city}</Typography></Grid>
                        <Grid item>
                            <Typography variant="h3">
                                {weather.temp}°{system === systems.metric ? ' C' : ' F'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">Feels {weather.feels}°</Typography>
                        </Grid>
                        <Grid item>
                            <Paper elevation={2}>
                                {weather.icon ?
                                    <img className={classes.img} src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                                    : null
                                }
                            </Paper>
                        </Grid>
                        <Grid item container direction="row" justify="center" spacing={3} className={classes.grid}>
                            {pressure ?
                                <Grid item>
                                    <Typography variant="subtitle2">
                                        <Grid item>Pressure</Grid>
                                        <Grid item >{weather.pressure} {system === systems.metric ? 'mm' : 'in'}Hg</Grid>
                                    </Typography>
                                </Grid>
                                : null
                            }
                            {humidity ?
                                <Grid item>
                                    <Typography variant="subtitle2">
                                        <Grid item>Humidity</Grid>
                                        <Grid item>{weather.humidity} %</Grid>
                                    </Typography>
                                </Grid>
                                : null
                            }
                        </Grid>
                    </Grid>
                </Box>
                : null}
            {firstName && city ? <WeatherForecast /> : null}
        </>
    )
}