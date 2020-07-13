import { Dispatch } from 'redux'
import { parseRawWeatherData } from '../common/utils'
import { actionTypes } from './types'
import { weatherT } from '../common/types'

const types = actionTypes;

export function changeSystem() {
    return {
        type: types.changeSystem
    }
}

export function changePressure() {
    return {
        type: types.changePressure
    }
}

export function changeHumidity() {
    return {
        type: types.changeHumidity
    }
}

export function changeServiceAvailable() {
    return {
        type: types.changeServiceAvailable
    }
}

export function gotWeather(weather: weatherT) {
    return {
        type: types.gotWeather,
        weather: weather
    }
}

export function getWeather() {
    return (dispatch: Dispatch) => {
        return fetch('http://localhost:8080/api/weather')
            .then(res => res.json())
            .then(data => {
                try {
                    const weather = parseRawWeatherData(data);
                    dispatch(gotWeather(weather));
                } catch (err) {
                    //console.log(err);
                    dispatch(changeServiceAvailable());
                }
            })
            .catch(err => {
                //console.log(err);
                dispatch(changeServiceAvailable());
            });
    }
}