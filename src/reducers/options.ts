import { actionTypes as types } from '../actions';
import { systems, initialState } from '../common/consts';
import { actionsT } from '../actions/types';

export default function options(state = initialState.options, action: actionsT) {
    switch (action.type) {
        case types.changeSystem:
            const system = state.system === systems.metric ? systems.imperial : systems.metric;
            return {...state, system: system};
        case types.changePressure:
            return {...state, pressure: !state.pressure};
        case types.changeHumidity:
            return {...state, humidity: !state.humidity};
        default:
            return state;
    }
}