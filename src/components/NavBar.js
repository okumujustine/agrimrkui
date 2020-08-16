import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

function NavBar({ cartState }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    setClicked(!clicked);
  };

  let location = window.location;

  return (
    <nav className="navbar_items">
      <h3 className="navbar_logo">
        <i className="fab fa-react"></i>
      </h3>
      <div className="navbar_menuIcon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "navbar_navMenu active" : "navbar_navMenu "}>
        <li onClick={handleClick}>
          <NavLink
            to="/home"
            activeClassName="active_class"
            className={"navbar_links"}
            active={location.pathname.startsWith("/home")}
          >
            Home
          </NavLink>
        </li>
        <li onClick={handleClick}>
          <NavLink
            to="/shop"
            activeClassName="active_class"
            className={"navbar_links"}
            active={location.pathname.startsWith("/shop")}
          >
            Shop
          </NavLink>
        </li>
        <li onClick={handleClick}>
          <NavLink
            activeClassName="active_class"
            className={"navbar_links"}
            to="/hire"
            active={location.pathname.startsWith("/hire")}
          >
            Hire
          </NavLink>
        </li>
        <li onClick={handleClick}>
          <NavLink
            to="/consultation"
            activeClassName="active_class"
            className="navbar_links"
            active={location.pathname.startsWith("/consultation")}
          >
            Consultation
          </NavLink>
        </li>
        <li onClick={handleClick}>
          <NavLink
            to="/blog"
            activeClassName="active_class"
            className="navbar_links"
            active={location.pathname.startsWith("/consultation")}
          >
            Blog
          </NavLink>
        </li>
        <li onClick={handleClick}>
          <NavLink
            to="/cart"
            activeClassName="active_class"
            className={"navbar_links"}
            active={location.pathname.startsWith("/cart")}
          >
            Cart{" "}
            <span className="cartNumber">{cartState.cartItems.length}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
const mapStateToProps = (state) => ({
  cartState: state.cartReducer,
});

export default connect(mapStateToProps, {})(NavBar);
