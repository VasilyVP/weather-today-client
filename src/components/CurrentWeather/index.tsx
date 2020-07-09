import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Box from '@material-ui/core/Box'
import { rootStateT } from '../../store/types'
import WeatherForecast from '../WeatherForecast'
import { weatherRowT, weatherT } from './types'

function parseWeather(data: weatherRowT): weatherT {
    return {
        code: data.cod,
        city: data.city.name,
        temp: data.list[0].main.temp,
        feels: data.list[0].main.feels_like,
        humidity: data.list[0].main.humidity,
        pressure: data.list[0].main.pressure,
        description: data.list[0].weather[0].description,
        icon: data.list[0].weather[0].icon
    }
}

const initialWeather: weatherT = {
    code: null,
    city: null,
    temp: null,
    feels: null,
    humidity: null,
    pressure: null,
    description: null,
    icon: null
}

export default () => {
    const userName = useSelector((state: rootStateT) => state.authentication.userName);

    const [weather, setWeather] = useState(initialWeather);

    //const useMemo

    useEffect(() => {
        fetch('http://localhost:8080/api/weather')
            .then(res => res.json())
            .then(data => {
                const weather = parseWeather(data);
                //console.log(weather);
                setWeather(weather);
            })
            .catch(err => console.log(err));
    }, []);

    const currentWeather = weather ? weather.description : 'Loading...';

    return (
        <>
            <Box my={1}>{currentWeather}</Box>
            {userName ? <WeatherForecast /> : null}
        </>
    )
}