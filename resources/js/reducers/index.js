import {combineReducers} from 'redux'
import accessTokenReducers from './addAccessTokenReducers'
import userIdReducers from './addUserIdReducers'

/**
 * Gộp các reducer thành một
 */
 export default combineReducers({
    accessToken: accessTokenReducers,
    userId: userIdReducers
});