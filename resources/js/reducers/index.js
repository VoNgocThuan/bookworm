import {combineReducers} from 'redux'
import accessTokenReducers from './addAccessTokenReducers'
import userIdReducers from './addUserIdReducers'
import totalCartQtyReducers from './addTotalCartQtyReducers'

/**
 * Gộp các reducer thành một
 */
 export default combineReducers({
    accessToken: accessTokenReducers,
    userId: userIdReducers,
    totalCartQty: totalCartQtyReducers
});