import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./features/Home";
import NavBar from "./components/NavBar";
import CartList from "./features/cart/CartList";

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={CartList} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
