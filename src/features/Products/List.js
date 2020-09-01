import React, { useEffect } from "react";
import { connect } from "react-redux";

import ProductCart from "../../components/ProductCart";
import { getProducts } from "../../redux/actions/products/ProductActions";
import Footer from "../../components/Footer";

function List({ getProducts, productsState }) {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {productsState.products.length === 0 && <p>No product listings</p>}
        {productsState.products.map((product) => (
          <React.Fragment key={product.id}>
            <ProductCart product={product} />
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  productsState: state.productsReducer,
});

export default connect(mapStateToProps, { getProducts })(List);
