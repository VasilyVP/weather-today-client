import { combineReducers } from 'redux'
import options from './options'
import authentication from './authentication'
import weather from './weather'
import { serviceAvailable } from './common'

const rootReducer = combineReducers({
    authentication,
    options,
    serviceAvailable,
    weather
})

export default rootReducer