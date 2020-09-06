import React from "react";
import { connect } from "react-redux";
import Rave from "react-flutterwave-rave";

import {
  removeFromCart,
  addToCart,
  incrementItemQuantity,
  decrementItemQuantity,
} from "../../redux/actions/cart/CartActions";
import { addOrders } from "../../redux/actions/orders/ordersAction";
import c from "../../static/products/876661122392077_1.jpg";
import { toast } from "react-toastify";

function CartList({
  cartState,
  removeFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  addOrders,
  authState,
}) {
  const API_publicKey_p = "FLWPUBK-006797527a53e4f60c1771a8b3d78da8-X";
  const API_publicKey = "FLWPUBK_TEST-1c33f1ea951399fbd663cb875dadd1be-X";

  const handlePay = () => {
    window.getpaidSetup({
      PBFPubKey: API_publicKey,
      customer_email: "okumujustine@gmail.com",
      amount: 500,
      customer_phone: "256781459239",
      currency: "UGX",
      payment_option: "mobilemoneyuganda",
      fullname: "Okumu Justine",
      // redirect_url: "https://rave-webhook.herokuapp.com/receivepayment",
      txref: "new-sale" + new Date(),
      meta: [
        {
          metaname: "flightID",
          metavalue: "AP1234",
        },
      ],

      callback: function (d) {
        if (d.tx) {
          var flw_ref = d.tx.flwRef;
          if (
            d.tx.chargeResponseCode === "00" ||
            d.tx.chargeResponseCode === "0"
          ) {
            toast.success("Wow! That was fast and easy!");
          } else {
            toast.error("Ouch! Please try again!");
          }
        }
        console.log(d);
      },
    });
    // window.getpaidSetup({
    //   amount: cartState.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    //   txref: "rave-checkout-1508751596",
    //   redirect_url: "http://localhost:3000/cart",
    //   PBFPubKey: publicKey,
    //   custom_title: "Agro Pay",
    //   payment_method: "both",
    //   customer_email: authState.user.email,
    //   customer_phone: authState.user.phone,
    //   currency: "UGX",
    //   onclose: function () {
    //     // toast.error("Ouch! Please try again!");
    //   },
    //   callback: function (res) {
    //     //  var flw_ref = d.tx.flwRef;
    //     console.log(res);
    //     if (res.success === false) {
    //       toast.error("Ouch! Please try again!");
    //     }
    //     if (res.respcode) {
    //       if (res.respcode === "00") {
    //         toast.error("Wow! That was fast and easy!");
    //       }
    //     }
    //   },
    // });
  };

  return (
    <div>
      {cartState.cartItems.length === 0 ? (
        <h6>You have no item in cart</h6>
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
                    <img className="h-2/12 w-2/12" src={c} alt="products" />
                    <div style={{ padding: "10px" }}>
                      <h4 style={{ paddingBottom: "8px" }}>{product.title}</h4>
                      <small style={{ lineHeight: "15px" }}>
                        is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries
                      </small>
                      <h4 className="pt-2">{product.price}</h4>
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
                    >
                      <i className="fas fa-plus-circle"></i>
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
                  {cartState.cartItems.reduce(
                    (a, c) => a + c.price * c.count,
                    0
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
