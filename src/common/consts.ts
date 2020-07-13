import { weatherT } from './types'

export enum systems {
    metric = 'metric',
    imperial = 'imperial'
}

const initialWeatherNow = {
    temp: null,
    feels: null,
    humidity: null,
    pressure: null,
    description: null,
    icon: null
}

export const initialWeather = { //: weatherT
    city: null,
    now: initialWeatherNow,
    forecast: null
}

export const initialState = {
    authentication: {
        //auth: false,
        userName: 'Vasily'
    },
    options: {
        system: systems.metric,
        pressure: true,
        humidity: true
    },
    serviceAvailable: true,
    weather: initialWeather
}