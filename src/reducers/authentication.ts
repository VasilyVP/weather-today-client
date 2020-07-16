import { initialState } from '../common/consts';
import { actionTypes, actionsT } from '../actions/types'

export default function authentication(state = initialState.authentication, action: actionsT) {
    if (action.type === actionTypes.signIn) {
        return action.user;
    }
    
    return state;
}