import { combineReducers } from 'redux';

import searchReducer from './search.reducer';
import stockReducer from './stock.reducer';

/**
 * Put all the store state in redux store
 */
const rootReducer = combineReducers({
    searchReducer,
    stockReducer
});
  
export default rootReducer;