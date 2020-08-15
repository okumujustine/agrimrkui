import React from "react";
import { connect } from "react-redux";

import { addToCart } from "../redux/actions/cart/CartActions";

function ProductCart({ product, addToCart, cartItemsState }) {
  return (
    <div className="prod_container">
      <img
        className="prod_image"
        src={require(`../static/products/${product.sku}_2.jpg`)}
        alt="products"
      />
      <h3>{product.title}</h3>
      <h3>${product.price}</h3>
      <button onClick={() => addToCart(cartItemsState, product)}>
        Add To Cart
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItemsState: state.cartReducer.cartItems,
});

export default connect(mapStateToProps, { addToCart })(ProductCart);
