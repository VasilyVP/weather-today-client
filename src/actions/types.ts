import { weatherT, notificationT } from '../common/types'
import { userT } from '../store/types'

export enum actionTypes {
    changeSystem = 'change system',
    changePressure = 'change pressure',
    changeHumidity = 'change humidity',
    changeServiceAvailable = 'change service availability',
    changeTheme = 'change the app theme',
    deleteAccount = 'delete the user account of the app',
    gettingWeather = 'getting weather data',
    gotWeather = 'got weather data',
    signIn = 'change auth state to signed in',
    signOut = 'change auth state to signed out',
    showNotification = 'show notification',
    dropNotification = 'drop notification',
}

export type actionsT = {
    type: actionTypes,
    weather?: weatherT,
    user: userT,
    notification: notificationT,
}