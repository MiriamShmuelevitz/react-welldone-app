import { combineReducers } from 'redux'
import  CategoryReducer from './CategoryReducer';
import LocationReducer from './LocationReducer';

export default combineReducers({
    CategoryReducer,
    LocationReducer
});
