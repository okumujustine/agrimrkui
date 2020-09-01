import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./features/Home";
import CartList from "./features/cart/CartList";
import ShopProducts from "./features/shop/ShopProducts";
import Hire from "./features/products/Hire";
import Blog from "./features/blog/Blogs";
import Consultation from "./features/consultation";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import BlogComment from "./features/blog/BlogComment";
import { loadUser } from "./redux/actions/auth/authActions";

function App({ loadUser }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <React.Fragment>
      <Router>
        <div className="flex flex-col">
          <header className="bg-gray-900 sm:flex sm:justify-between">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-white">logo</div>
              <div className="sm:hidden">
                <button
                  onClick={() => setShow(!show)}
                  type="button"
                  className="text-gray-500 hover:text-white focus:text-white focus:outline-none"
                >
                  {show ? (
                    <i className="fas fa-times"></i>
                  ) : (
                    <i className="fas fa-bars"></i>
                  )}
                </button>
              </div>
            </div>
            <div
              className={
                show
                  ? "px-2 pt-2 pb-4 block sm:block"
                  : "px-2 pt-2 pb-4 hidden sm:flex"
              }
            >
              <NavLink
                to="/home"
                className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 text-white font-semibold hover:bg-gray-800"
              >
                {" "}
                Home{" "}
              </NavLink>
              <NavLink
                to="/hire"
                className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-white font-semibold hover:bg-gray-800"
              >
                {" "}
                Hire{" "}
              </NavLink>
              <NavLink
                to="/consultation"
                className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-white font-semibold hover:bg-gray-800"
              >
                {" "}
                Consultation{" "}
              </NavLink>
            </div>
          </header>
          <div>
            <p>body</p>
          </div>
          <div>
            <p>Fooer</p>
          </div>
        </div>
      </Router>
      {/* 
        <NavBar />
        <ToastContainer autoClose={4000} />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/shop" component={ShopProducts} />
          <Route path="/hire" component={Hire} />
          <Route path="/consultation" component={Consultation} />
          <Route path="/blog" component={Blog} />
          <Route path="/cart" component={CartList} />
          <Route path="/comment/:id" component={BlogComment} />
        </Switch>
      </Router> */}
    </React.Fragment>
  );
}

export default connect(null, { loadUser })(App);
