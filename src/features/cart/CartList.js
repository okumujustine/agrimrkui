import React from "react";
import { connect } from "react-redux";
import {
  removeFromCart,
  addToCart,
  incrementItemQuantity,
  decrementItemQuantity,
} from "../../redux/actions/cart/CartActions";
import c from "../../static/products/876661122392077_1.jpg";

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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{ display: "flex", width: "70%", flexDirection: "column" }}
          >
            {/* loop starts here */}
            {cartState.cartItems.map((product, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  paddingBottom: "12px",
                  flexGrow: 1,
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <div style={{ flexBasis: "60%" }}>
                  <div style={{ display: "flex" }}>
                    <img
                      style={{ width: "20%", height: "20%" }}
                      src={c}
                      alt="products"
                    />
                    <div style={{ padding: "10px" }}>
                      <h4 style={{ paddingBottom: "8px" }}>{product.title}</h4>
                      <small style={{ lineHeight: "15px" }}>
                        is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries
                      </small>
                      <h4 style={{ paddingTop: "8px" }}>{product.price}</h4>
                    </div>
                  </div>
                </div>
                <div style={{ flexBasis: "15%" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      onClick={() =>
                        decrementItemQuantity(cartState.cartItems, product)
                      }
                    >
                      <i class="fas fa-minus-circle"></i>
                    </button>
                    <h4>{product.count}</h4>
                    <button
                      onClick={() =>
                        incrementItemQuantity(cartState.cartItems, product)
                      }
                    >
                      <i class="fas fa-plus-circle"></i>
                    </button>
                  </div>
                </div>
                <div style={{ flexBasis: "10%" }}>
                  <h4>{product.count * product.price}</h4>
                </div>
                <div>
                  <button
                    onClick={() => removeFromCart(cartState.cartItems, product)}
                  >
                    <i class="fas fa-trash-alt"></i>
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
                  {cartState.cartItems.reduce(
                    (a, c) => a + c.price * c.count,
                    0
                  )}
                </h5>
              </div>
              <br />
              <button>CHECKOUT</button>
            </div>
          </div>
        </div>
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
