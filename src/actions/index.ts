import { Dispatch } from 'redux'
//import { parseRawWeatherData } from '../common/utils'
import { actionTypes } from './types'
import { weatherT } from '../common/types'
import { userT } from '../store/types'
import { fetchParsedWeather } from '../middleware/api';

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

export function gettingWeather() {
    return {
        type: types.gettingWeather
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
        dispatch(gettingWeather());

        return fetchParsedWeather()
            .then(weather => {
                dispatch(gotWeather(weather));
                dispatch(gettingWeather());
            })
            .catch(err => {
                dispatch(gettingWeather());
                dispatch(changeServiceAvailable());
            });
    }
}

export function signIn(user: userT) {
    return {
        type: types.signIn,
        user: {
            email: user.email,
            firstName: user.firstName
        }
    }
}