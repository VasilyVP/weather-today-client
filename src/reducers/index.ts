import { combineReducers } from 'redux'
import options from './options'
import authentication from './authentication'
import weather from './weather'
import { services } from './services'

const rootReducer = combineReducers({
    authentication,
    options,
    services,
    weather,
})

export default rootReducer