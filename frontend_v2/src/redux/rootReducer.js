import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';
import searchReducer from './reducers/searchReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    movies: searchReducer
});

export default rootReducer;