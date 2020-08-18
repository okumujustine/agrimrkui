import React, { useEffect } from "react";
import { connect } from "react-redux";

import ProductCart from "../../components/ProductCart";
import { getProducts } from "../../redux/actions/products/ProductActions";

function List({ getProducts, productsState }) {
  useEffect(() => {
    getProducts();
  }, []);

  return (
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
  );
}

const mapStateToProps = (state) => ({
  productsState: state.productsReducer,
});

export default connect(mapStateToProps, { getProducts })(List);
