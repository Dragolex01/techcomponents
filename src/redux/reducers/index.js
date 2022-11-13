import { combineReducers } from 'redux';
import Auth from './auth';
import Categories from './categories';

export default combineReducers({
    Auth,
    Categories
})