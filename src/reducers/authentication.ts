import { initialState } from '../common/consts';
import { actionTypes, actionsT } from '../actions/types'

export default function authentication(state = initialState.authentication, action: actionsT) {
    switch (action.type) {
        case actionTypes.signIn:
            return action.user;
        case actionTypes.signOut:
            return initialState.authentication;
        default:
            return state;
    }
}