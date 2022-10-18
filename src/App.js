import "./styles/App.scss";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./containers/Home";
import Error404 from "./containers/errors/Error404";

import Signup from "./containers/auth/Signup";
import Login from "./containers/auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* ERROR */}
        <Route path="*" element={<Error404/>} />

        <Route exact path="/" element={<Home/>} />

        {/* AUTENTIFICACION USUARIOS */}
        <Route exact path="/register" element={<Signup/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
