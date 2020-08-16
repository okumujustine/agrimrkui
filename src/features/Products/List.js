import React, { useEffect } from "react";
import { connect } from "react-redux";

import ProductCart from "../../components/ProductCart";
import { getProducts } from "../../redux/actions/products/ProductActions";

function List({ getProducts, productsState }) {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {productsState.products.length === 0 && <p>No product listings</p>}
      {productsState.products.map((product) => (
        <div key={product.id}>
          <ProductCart product={product} />
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  productsState: state.productsReducer,
});

export default connect(mapStateToProps, { getProducts })(List);
