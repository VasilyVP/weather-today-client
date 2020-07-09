export type weatherRowT = {
    cod: number,
    city: {
        name: string
    },
    list: {
        dt: number,
        main: {
            temp: number,
            feels_like: number,
            humidity: number,
            pressure: number
        },
        weather: {
            main: string,
            description: string,
            icon: string
        }[]
    }[]
}

export type weatherT = {
    code: number | null,
    city: string | null,
    temp: number | null,
    feels: number | null,
    humidity: number | null,
    pressure: number | null,
    description: string | null,
    icon: string | null
}