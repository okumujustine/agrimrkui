import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./features/Home";
import NavBar from "./components/NavBar";
import CartList from "./features/cart/CartList";
import ShopProducts from "./features/shop/ShopProducts";
import Hire from "./features/products/Hire";
import Blog from "./features/blog";
import Consultation from "./features/consultation";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/shop" component={ShopProducts} />
          <Route path="/hire" component={Hire} />
          <Route path="/consultation" component={Consultation} />
          <Route path="/blog" component={Blog} />
          <Route path="/cart" component={CartList} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
