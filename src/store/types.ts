import { initialState } from '../common/consts'
import { weatherT } from '../common/types'

export type rootStateT = {
    authentication: {
        //auth: boolean,
        userName: null | string
    },
    options: typeof initialState.options,
    serviceAvailable: boolean,
    weather: weatherT
}