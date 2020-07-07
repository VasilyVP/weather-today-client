export enum actionTypes {
    changeSystem = 'change system',
    changePressure = 'change pressure',
    changeHumidity = 'change humidity'
}

const types = actionTypes;

export function changeSystem() {
    return {
        type: types.changeSystem
    }
}

export function changePressure() {
    return {
        type: types.changePressure
    }
}

export function changeHumidity() {
    return {
        type: types.changeHumidity
    }
}