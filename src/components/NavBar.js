import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function NavBar({ cartState }) {
  return (
    <div>
      <header className="nav_navHeader">
        <nav className="nav_navContent">
          <h2>Shop</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">
                Cart <span>{cartState.cartItems.length}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
const mapStateToProps = (state) => ({
  cartState: state.cartReducer,
});

export default connect(mapStateToProps, {})(NavBar);
