import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
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
import Consultation from "./features/consultation/consultation";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import BlogComment from "./features/blog/BlogComment";
import { loadUser } from "./redux/actions/auth/authActions";
import Footer from "./components/Footer";
import AddBlog from "./features/blog/AddBlog";
import HireList from "./features/products/HireList";
import Admin from "./features/admin/Admin";
import AdminProtection from "./common/AdminProtection";
import ChatArea from "./features/consultation/ChatArea";

function App({ loadUser }) {
  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <React.Fragment>
      <Router>
        <div className="flex flex-col bg-agribackgroung">
          <ToastContainer autoClose={4000} />
          <NavBar />
          <div className="px-4 min-h-screen">
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route path="/shop" component={ShopProducts} />
              <Route path="/hire" component={Hire} />
              <Route path="/consultation" component={Consultation} />
              <Route path="/blog" component={Blog} />
              <Route path="/addblog" component={AddBlog} />
              <Route path="/cart" component={CartList} />
              <Route path="/comment/:id" component={BlogComment} />
              <Route path="/hirelist" component={HireList} />
              <Route path="/chat/:phone" component={ChatArea} />
              <AdminProtection path="/admin" component={Admin} />
            </Switch>
          </div>
          <div
            style={{
              marginTop: "auto",
            }}
          >
            <Footer />
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default connect(null, { loadUser })(App);
