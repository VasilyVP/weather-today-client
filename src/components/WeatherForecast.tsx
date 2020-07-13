import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, makeStyles, createStyles, Theme } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import { rootStateT } from '../store/types'
import { weatherProps } from '../common/types'
import { alignWeatherForecast } from '../common/utils'

const useStyles = makeStyles((theme: Theme) => createStyles({
    grid: {
        //padding: theme.spacing(1),
        textAlign: 'center'
        // backgroundColor: '#e1f5fe'
    },
    paper: {
        // width: '8rem'
        backgroundColor: '#64ffda'
    },
    img: {
        width: '50px'
    }
}));

export default () => {
    const classes = useStyles();

    const forecast = useSelector((state: rootStateT) => state.weather.forecast as Partial<weatherProps>[]);
    const system = useSelector((state: rootStateT) => state.options.system);

    const weatherForecast = alignWeatherForecast(forecast, system).map((day, i) => {        
        const today = new Date();
        const date = new Date(today.setDate(today.getDate() + i)).toLocaleString([], {
            weekday: 'short',
            day: 'numeric'
        });
        
        return (
            <Grid key={i} item className={classes.grid}>
                <Grid item>
                    {date}
                </Grid>
                <Grid item>
                    <Paper className={classes.paper} elevation={2}>
                        {day.icon ? <img className={classes.img} src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`} /> : null}
                    </Paper>
                </Grid>
                <Grid item>
                    {day.tempMax}°
                </Grid>
                <Grid>
                    {day.tempMin}°
                </Grid>
            </Grid>
        )
    });

    // leaving clear 5 days
    weatherForecast.pop();

    return (
        <Grid container justify="center" spacing={1}>
            {weatherForecast}
        </Grid>
    )
}