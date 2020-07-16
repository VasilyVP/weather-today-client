//import rootReducer from '../reducers'

//export type rootStateT = ReturnType<typeof rootReducer>

export type weatherRawChunk = {
    dt: number;
    main: {
        temp: number,
        temp_max: number,
        temp_min: number,
        feels_like: number,
        humidity: number,
        pressure: number,
    },
    weather: {
        main: string,
        description: string,
        icon: string
    }[]
};

export type weatherRawT = {
    cod: number,
    city: {
        name: string,
    },
    list: weatherRawChunk[],
};

export type weatherProps = {
    temp: number | null
    tempMax: number | null,
    tempMin: number | null,
    feels: number | null,
    humidity: number | null,
    pressure: number | null,
    description: string | null,
    main: string | null,
    icon: string | null
}

export type weatherT = {
    city: string | null,
    now: Partial<weatherProps>,
    forecast: Partial<weatherProps>[] | null
}

export type responseT = {
    code: number,
    msg: string
}