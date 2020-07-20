import { systems, themes, initialState } from '../common/consts'
import { actionTypes, actionsT } from '../actions/types'

const types = actionTypes;

export default function options(state = initialState.options, action: actionsT) {
    switch (action.type) {
        case types.changeSystem:
            const system = state.system === systems.metric ? systems.imperial : systems.metric;
            return {...state, system: system};
        case types.changePressure:
            return {...state, pressure: !state.pressure};
        case types.changeHumidity:
            return {...state, humidity: !state.humidity};
        case types.changeTheme:
            const theme = state.theme === themes.light ? themes.dark : themes.light;
            return { ...state, theme: theme }
        default:
            return state;
    }
}