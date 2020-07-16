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
        email: null,
        firstName: null
    },
    options: {
        system: systems.metric,
        pressure: true,
        humidity: true
    },
    services: {
        serviceAvailable: true,
        gettingWeather: false,
    },
    weather: initialWeather
}