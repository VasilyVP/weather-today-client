import { initialState } from '../common/consts'
import { weatherT } from '../common/types'

export type userT = {
    email: null | string,
    firstName: null | string
}

export type rootStateT = {
    authentication: userT,
    options: typeof initialState.options,
    services: {
        serviceAvailable: boolean,
        gettingWeather: boolean,
    }
    weather: weatherT
}