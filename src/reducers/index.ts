import { combineReducers } from 'redux'
import options from './options'
import authentication from './authentication'

const rootReducer = combineReducers({
    authentication,
    options
})

export default rootReducer