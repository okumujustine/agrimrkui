import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { logoutUser } from "../redux/actions/auth/authActions";

function NavBar({ cartState, authState, logoutUser }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    setClicked(!clicked);
  };

  const { isAuthenticated } = authState;
  const authLinks = (
    <ul className={clicked ? "navbar_navMenu active" : "navbar_navMenu "}>
      <li onClick={handleClick}>
        <NavLink
          to="/home"
          activeClassName="active_class"
          className={"navbar_links"}
        >
          Home
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          to="/login"
          activeClassName="active_class"
          className={"navbar_links"}
        >
          Login
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          to="/register"
          activeClassName="active_class"
          className={"navbar_links"}
        >
          Register
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          to="/shop"
          activeClassName="active_class"
          className={"navbar_links"}
        >
          Shop
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          activeClassName="active_class"
          className={"navbar_links"}
          to="/hire"
        >
          Hire
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          to="/consultation"
          activeClassName="active_class"
          className="navbar_links"
        >
          Consultation
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          to="/blog"
          activeClassName="active_class"
          className="navbar_links"
        >
          Blog
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          to="/cart"
          activeClassName="active_class"
          className={"navbar_links"}
        >
          Cart <span className="cartNumber">{cartState.cartItems.length}</span>
        </NavLink>
      </li>
    </ul>
  );

  const loggedInLinks = (
    <ul className={clicked ? "navbar_navMenu active" : "navbar_navMenu "}>
      <li onClick={handleClick}>
        <NavLink
          to="/home"
          activeClassName="active_class"
          className={"navbar_links"}
        >
          Home
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          to="/shop"
          activeClassName="active_class"
          className={"navbar_links"}
        >
          Shop
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          activeClassName="active_class"
          className={"navbar_links"}
          to="/hire"
        >
          Hire
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          to="/consultation"
          activeClassName="active_class"
          className="navbar_links"
        >
          Consultation
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          to="/blog"
          activeClassName="active_class"
          className="navbar_links"
        >
          Blog
        </NavLink>
      </li>
      <li onClick={handleClick}>
        <NavLink
          to="/cart"
          activeClassName="active_class"
          className={"navbar_links"}
        >
          Cart <span className="cartNumber">{cartState.cartItems.length}</span>
        </NavLink>
      </li>
      <li>
        <button onClick={() => logoutUser()}>logout</button>
      </li>
    </ul>
  );

  return (
    <nav className="navbar_items">
      <h3 className="navbar_logo">
        <i className="fab fa-react"></i>
      </h3>
      <div className="navbar_menuIcon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      {isAuthenticated === null
        ? null
        : isAuthenticated
        ? loggedInLinks
        : authLinks}
    </nav>
  );
}
const mapStateToProps = (state) => ({
  cartState: state.cartReducer,
  authState: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
