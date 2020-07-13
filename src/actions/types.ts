import { weatherT } from '../common/types'

export enum actionTypes {
    changeSystem = 'change system',
    changePressure = 'change pressure',
    changeHumidity = 'change humidity',
    changeServiceAvailable = 'change service availability',
    gotWeather = 'got weather data'
}

export type actionsT = {
    type: actionTypes,
    weather?: weatherT
}