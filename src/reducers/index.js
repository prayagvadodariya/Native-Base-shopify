import { combineReducers } from 'redux';
import cartItemReducer from './cartItemReducer'
import wishlistItemReducer from './wishlistItemReducer'


const rootReducer = combineReducers({
    cartItemReducer,
    wishlistItemReducer,
});

export default rootReducer

