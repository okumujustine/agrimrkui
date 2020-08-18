import React from "react";
import { connect } from "react-redux";
import {
  removeFromCart,
  addToCart,
  incrementItemQuantity,
  decrementItemQuantity,
} from "../../redux/actions/cart/CartActions";

function CartList({
  cartState,
  removeFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
}) {
  return (
    <div className="home">
      {cartState.cartItems.length === 0 ? (
        <h6>You have no item in cart</h6>
      ) : (
        <ul>
          {cartState.cartItems.map((product, index) => (
            <li key={index}>
              <h6>{product.title}</h6>
              <small>qty: {product.count}</small>
              <br />
              <small>unit price: {product.price}</small>
              <br />
              <b>price: {product.count * product.price}</b>
              <br />
              <div>
                <button
                  onClick={() =>
                    incrementItemQuantity(cartState.cartItems, product)
                  }
                >
                  increment
                </button>
                <button
                  onClick={() =>
                    decrementItemQuantity(cartState.cartItems, product)
                  }
                >
                  decrement
                </button>
              </div>
              <br />
              <button
                onClick={() => removeFromCart(cartState.cartItems, product)}
              >
                remove
              </button>
              <br />
              <hr />
            </li>
          ))}
          {cartState.cartItems.reduce((a, c) => a + c.price * c.count, 0)}{" "}
          <br />
          <button>checkout</button>
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartState: state.cartReducer,
});

export default connect(mapStateToProps, {
  removeFromCart,
  addToCart,
  incrementItemQuantity,
  decrementItemQuantity,
})(CartList);
