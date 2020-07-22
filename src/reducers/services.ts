import { initialState } from '../common/consts';
import { actionTypes, actionsT } from '../actions/types'
import { initialNotification } from '../common/consts'

export function services(state = initialState.services, action: actionsT) {
    switch (action.type) {
        case actionTypes.setServiceAvailable:
            return { ...state, serviceAvailable: action.serviceAvailable };
        case actionTypes.gettingWeather:
            return { ...state, gettingWeather: !state.gettingWeather };
        case actionTypes.showNotification:
            return { ...state, notification: {
                type: action.notification.type,
                msg: action.notification.msg
            }};
        case actionTypes.dropNotification:
            return { ...state, notification: initialNotification };
        default:
            return state;
    }
}