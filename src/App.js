import './styles/App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Home from './containers/Home';
import Shop from './containers/Shop';
import ProductInfo from './containers/pages/ProductInfo';
import AboutUs from './containers/pages/AboutUs';
import Contact from './containers/pages/Contact';
import Cart from './containers/pages/Cart';

import Signup from './containers/auth/Signup';
import Login from './containers/auth/Login';
import Activate from './containers/auth/Activate';

import Error404 from './containers/errors/Error404';


function App() {
  console.log(localStorage)
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error */}
          <Route path='*' element={<Error404 />} />

          <Route exact path='/' element={<Home />} />
          <Route exact path='/cart' element={<Cart />} />

          {/* Authentication users */}
          <Route exact path='/register' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/activate/:uid/:token' element={<Activate />} />

          {/* Shop */}
          <Route exact path='/shop' element={<Shop/>} />
          <Route exact path='/product/:productId' element={<ProductInfo />}/>

          {/* Pages */}
          <Route exact path='/about_us' element={<AboutUs />} />
          <Route exact path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
