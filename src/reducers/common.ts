import { initialState } from '../common/consts';
import { actionTypes, actionsT } from '../actions/types'

export function serviceAvailable(state = initialState.serviceAvailable, action: actionsT) {
    if (action.type === actionTypes.changeServiceAvailable) return !state;

    return state;
}