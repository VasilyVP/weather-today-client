import { Dispatch } from 'redux'
import { actionTypes } from './types'
import { weatherT, notificationT } from '../common/types'
import { userT } from '../store/types'
import { fetchParsedWeather, postSignInInfo, getSignOut, deleteAccountAPI } from '../middleware/api';
import { notificationTypes } from '../common/consts';

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

export function setServiceAvailable(availability: boolean) {
    return {
        type: types.setServiceAvailable,
        serviceAvailable: availability
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

export function showNotification(notification: notificationT) {
    return {
        type: types.showNotification,
        notification: {
            type: notification.type,
            msg: notification.msg,
        }
    }
}

export function dropNotification() {
    return {
        type: types.dropNotification
    }
}

export function getWeather() {
    return async (dispatch: Dispatch) => {
        dispatch(gettingWeather());
        try {
            const weather = await fetchParsedWeather()

            dispatch(gotWeather(weather));
            dispatch(gettingWeather());
        } catch {
            dispatch(gettingWeather());
            dispatch(setServiceAvailable(false));
        }
    }
}

export function setSignedIn(user: userT) {
    return {
        type: types.signIn,
        user: {
            email: user.email,
            firstName: user.firstName
        }
    }
}

type loginInfoT = {
    email: string,
    password: string
}

export function trySignIn(user: loginInfoT) {
    return async (dispatch: Dispatch) => {
        try {
            const res = await postSignInInfo(user);
            if (res.code === 200) {
                dispatch(setSignedIn(res.user));
            } else dispatch(showNotification({
                type: notificationTypes.error,
                msg: res.msg
            }));
        } catch (err) {
            dispatch(showNotification({
                type: notificationTypes.error,
                msg: err.message
            }));
        }
    }
}

export function setUnauthorized() {
    return {
        type: types.signOut
    }
}

export function signOut() {
    return async (dispatch: Dispatch) => {
        try {
            localStorage.clear();
            await getSignOut();
            dispatch(setUnauthorized());
        } catch {
            dispatch(showNotification({
                type: notificationTypes.error,
                msg: 'Service unavailable now'
            }));
        }
    }
}

export function changeTheme() {
    return {
        type: types.changeTheme
    }
}

export function deleteAccount() {
    return async (dispatch: Dispatch<any>) => {
        try {
            await deleteAccountAPI();
            dispatch(signOut());
        } catch (err) {
            dispatch(showNotification({
                type: notificationTypes.error,
                msg: err.message
            }));
        }
    }
}