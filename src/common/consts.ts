export enum systems {
    metric = 'metric',
    imperial = 'imperial'
}

export const initialState = {
    authentication: {
        //auth: false,
        username: null
    },
    options: {
        system: systems.metric,
        pressure: true,
        humidity: true
    }
}