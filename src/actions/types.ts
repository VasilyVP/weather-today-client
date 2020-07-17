import { weatherT, notificationT } from '../common/types'
import { userT } from '../store/types'

export enum actionTypes {
    changeSystem = 'change system',
    changePressure = 'change pressure',
    changeHumidity = 'change humidity',
    changeServiceAvailable = 'change service availability',
    gettingWeather = 'getting weather data',
    gotWeather = 'got weather data',
    signIn = 'change auth state to signed in',
    showNotification = 'show notification',
    dropNotification = 'drop notification',
}

export type actionsT = {
    type: actionTypes,
    weather?: weatherT,
    user: userT,
    notification: notificationT,
}