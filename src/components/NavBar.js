import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { logoutUser } from "../redux/actions/auth/authActions";

function NavBar({ cartState, authState, logoutUser }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    setClicked(!clicked);
  };
  let location = useLocation();
  // console.log(location.hash);
  const { isAuthenticated } = authState;

  const authLinks = (
    <React.Fragment>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-agrisolidgreen">logo</div>
        <div className="sm:hidden">
          <button
            onClick={() => setClicked(!clicked)}
            type="button"
            className=" text-agrisolidgreen focus:outline-none"
          >
            {clicked ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </button>
        </div>
      </div>
      <div
        className={
          clicked
            ? "px-2 pt-2 pb-4 block sm:block"
            : "px-2 pt-2 pb-4 hidden sm:flex"
        }
      >
        <NavLink
          to="/home"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Home{" "}
        </NavLink>
        <NavLink
          to="/hire"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Hire{" "}
        </NavLink>
        <NavLink
          to="/consultation"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Consultation{" "}
        </NavLink>
        <NavLink
          to="/shop"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Shop{" "}
        </NavLink>
        <NavLink
          to="/blog"
          activeClassName="active_class"
          isActive={(match, location) => {
            let pathStrings = location.pathname.split("/");
            if (match) {
              return true;
            } else if (pathStrings[1] === "comment") {
              return true;
            } else if (pathStrings[1] === "addblog") {
              return true;
            } else {
              return false;
            }
          }}
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Blog{" "}
        </NavLink>
        <NavLink
          to="/cart"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung rounded-full"
        >
          <span className="but">{cartState.cartItems.length}</span>
        </NavLink>
        <NavLink
          to="/login"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Login{" "}
        </NavLink>
        <NavLink
          to="/register"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Register{" "}
        </NavLink>
      </div>
    </React.Fragment>
  );

  const loggedInLinks = (
    <React.Fragment>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-agrisolidgreen">logo</div>
        <div className="sm:hidden">
          <button
            onClick={() => setClicked(!clicked)}
            type="button"
            className=" text-agrisolidgreen focus:outline-none"
          >
            {clicked ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </button>
        </div>
      </div>
      <div
        className={
          clicked
            ? "px-2 pt-2 pb-4 block sm:block"
            : "px-2 pt-2 pb-4 hidden sm:flex"
        }
      >
        <NavLink
          to="/home"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Home{" "}
        </NavLink>
        <NavLink
          to="/hire"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Hire{" "}
        </NavLink>
        <NavLink
          to="/consultation"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Consultation{" "}
        </NavLink>
        <NavLink
          to="/shop"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Shop{" "}
        </NavLink>
        <NavLink
          to="/blog"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 rounded px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung"
        >
          {" "}
          Blog{" "}
        </NavLink>
        <NavLink
          to="/cart"
          activeClassName="active_class"
          className="block sm:mt-0 sm:ml-2 px-2 py-1 mt-1 text-agrisolidgreen font-semibold hover:bg-agrisolidgreen hover:text-agribackgroung rounded-full"
        >
          <span className="but">{cartState.cartItems.length}</span>
        </NavLink>
        {/* <button onClick={() => logoutUser()}>logout</button> */}
      </div>
    </React.Fragment>
  );

  return (
    <header className="sm:flex sm:justify-between bg-agribackgroung border-agrisolidgreen border-b-2 sticky top-0 z-50">
      {isAuthenticated === null
        ? null
        : isAuthenticated
        ? loggedInLinks
        : authLinks}
    </header>
  );
}
const mapStateToProps = (state) => ({
  cartState: state.cartReducer,
  authState: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
