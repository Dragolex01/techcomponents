import { combineReducers } from 'redux';
import Auth from './auth';
import Profile from './profile';
import Categories from './categories';
import Products from './products';
import Cart from './cart';

export default combineReducers({
    Auth,
    Profile,
    Categories,
    Products,
    Cart
})