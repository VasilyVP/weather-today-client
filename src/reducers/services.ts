import { initialState } from '../common/consts';
import { actionTypes, actionsT } from '../actions/types'
import { stat } from 'fs';

export function services(state = initialState.services, action: actionsT) {
    switch (action.type) {
        case actionTypes.changeServiceAvailable:
            return { ...state, serviceAvailable: !state.serviceAvailable };
        case actionTypes.gettingWeather:
            return { ...state, gettingWeather: !state.gettingWeather };
        default:
            return state;
    }
}