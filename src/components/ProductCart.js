import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../redux/actions/cart/CartActions";
import "./Product.css";
import { imageUrl } from "../sdk/serverConsts";

function ProductCart({ product, addToCart, cartItemsState }) {
  console.log(imageUrl);
  return (
    <Link
      to="/shop"
      className="flex flex-col rounded overflow-hidden hover:shadow-lg mb-10 w-full bg-white"
    >
      <div className="bg-white">
        <img
          className="object-contain h-32 w-full"
          src={`${imageUrl}${product.image_one}`}
          alt="Sunset in the mountains"
        />
      </div>
      <div className="px-6 py-2">
        <div className="font-bold text-md truncate">{product.title}</div>
        <p className="text-gray-700 text-base truncate">
          {product.description}
        </p>
      </div>
      <div className="px-6">
        <h1 className="font-bold">Ugx {product.price}</h1>
      </div>
      <div className="px-6 pt-4 pb-2 justify-end">
        <button
          onClick={() => addToCart(cartItemsState, product)}
          className="inline-block px-3 py-1 text-sm font-semibold mr-2 mb-2 w-full bg-agrisolidgreen text-agribackgroung"
        >
          ADD TO CART
        </button>
      </div>
    </Link>
  );
}

const mapStateToProps = (state) => ({
  cartItemsState: state.cartReducer.cartItems,
});

export default connect(mapStateToProps, { addToCart })(ProductCart);
