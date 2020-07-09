export enum systems {
    metric = 'metric',
    imperial = 'imperial'
}

export const initialState = {
    authentication: {
        //auth: false,
        userName: null
    },
    options: {
        system: systems.metric,
        pressure: true,
        humidity: true
    }
}