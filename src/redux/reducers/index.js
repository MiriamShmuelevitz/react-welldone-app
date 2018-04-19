import { combineReducers } from 'redux'
import listItem from './ListReducer';
import AppReducer from './AppReducer';

export default combineReducers({
    CategoryReducer: listItem('category'),
    LocationReducer: listItem('location'),
    AppReducer
});
