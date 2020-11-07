import React from "react";
import { connect } from "react-redux";

import {
  removeFromCart,
  addToCart,
  incrementItemQuantity,
  decrementItemQuantity,
} from "../../redux/actions/cart/CartActions";
import { addOrders } from "../../redux/actions/orders/ordersAction";
import { imageUrl } from "../../sdk/serverConsts";
import EmptyCartSvg from "./EmptyCartSvg";
import { formatMoney } from "../../helperfuncs/formatingfunctions";

function CartList({
  cartState,
  removeFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
}) {
  const handlePay = () => {
    console.log("handle payment here");
  };

  return (
    <div>
      {cartState.cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="z-10 font-bold text-agrisolidgreen">
            Your cart is empty
          </p>
          <EmptyCartSvg />
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex flex-col w-8/12">
            {/* loop starts here */}
            {cartState.cartItems.map((product, index) => (
              <div
                key={index}
                className="flex justify-between w-full mb-5 pb-3 items-center bg-white p-4"
              >
                <div className="w-8/12">
                  <div className="flex">
                    <img
                      className="object-contain h-2/12 w-3/12"
                      src={`${imageUrl}${product.image_one}`}
                      alt="cart"
                    />
                    <div style={{ padding: "10px" }}>
                      <h4 style={{ paddingBottom: "8px" }}>{product.title}</h4>
                      <small style={{ lineHeight: "15px" }}>
                        {product.description}
                      </small>
                      <h4 className="pt-2">{formatMoney(product.price)}</h4>
                    </div>
                  </div>
                </div>
                <div className="w-1/12 ml-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() =>
                        decrementItemQuantity(cartState.cartItems, product)
                      }
                    >
                      <i className="fas fa-minus-circle"></i>
                    </button>
                    <h4>{product.count}</h4>
                    <button
                      onClick={() =>
                        incrementItemQuantity(cartState.cartItems, product)
                      }
                      className="focus:outline-none"
                    >
                      <i className="fas fa-plus-circle"></i>
                    </button>
                  </div>
                </div>
                <div style={{ flexBasis: "10%" }}>
                  <h4>{formatMoney(product.count * product.price)}</h4>
                </div>
                <div>
                  <button
                    onClick={() => removeFromCart(cartState.cartItems, product)}
                    className="focus:outline-none"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
            {/* loop stops here */}
          </div>
          <div
            style={{
              width: "28%",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              alignItems: "center",
              flexDirection: "column",
              padding: "20px",
              height: "100%",
            }}
          >
            <h4>ORDER SUMMARY</h4>
            <hr />
            <br />
            <div
              style={{
                width: "100%",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>TOTAL COST</h5>
                <h5>
                  {formatMoney(
                    cartState.cartItems.reduce(
                      (a, c) => a + c.price * c.count,
                      0
                    )
                  )}
                </h5>
              </div>
              <br />
              {/* <button onClick={addOrders}>CHECKOUT</button> */}
              <button onClick={handlePay}>PAY</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartState: state.cartReducer,
  authState: state.authReducer,
});

export default connect(mapStateToProps, {
  removeFromCart,
  addToCart,
  incrementItemQuantity,
  decrementItemQuantity,
  addOrders,
})(CartList);
