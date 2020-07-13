import { initialState } from '../common/consts'
import { actionTypes, actionsT } from '../actions/types'

export default function weather(state = initialState.weather, action: actionsT) {
    if (action.type === actionTypes.gotWeather) {
            return action.weather
    }
    
    return state;
}