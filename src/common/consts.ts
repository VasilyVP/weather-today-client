export enum systems {
    metric = 'metric',
    imperial = 'imperial'
}

export enum notificationTypes {
    //undefined = 'undefined',
    error = 'error',
}

export enum themes {
    light = 'light',
    dark = 'dark'
}

const initialWeatherNow = {
    temp: null,
    feels: null,
    humidity: null,
    pressure: null,
    description: null,
    icon: null
}

export const initialWeather = {
    updated: null,
    city: null,
    now: initialWeatherNow,
    forecast: null
}

export const initialNotification = {
    type: notificationTypes.error,
    msg: '',
}

export const initialState = {
    authentication: {
        email: null,
        firstName: null
    },
    options: {
        system: systems.metric,
        pressure: true,
        humidity: true,
        theme: themes.light
    },
    services: {
        serviceAvailable: true,
        gettingWeather: false,
        notification: initialNotification
    },
    weather: initialWeather
}

const redirectUri = 'https://weather.vasily.dev/oauthsignin';

export const googleAuth = {
    clientId: '934395031037-lakk45hf1gpr8fihvutsgihb5q1ma99a.apps.googleusercontent.com',
    authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
    redirectUri: redirectUri,
    scopes: ['openid', 'email', 'profile']
}