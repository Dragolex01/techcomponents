import { combineReducers } from 'redux';
import Auth from './auth';
import Categories from './categories';
import Products from './products';
import Cart from './cart';

export default combineReducers({
    Auth,
    Categories,
    Products,
    Cart
})