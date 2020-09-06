import React, { useEffect } from "react";
import { connect } from "react-redux";

import ProductCart from "../../components/ProductCart";
import { getProducts } from "../../redux/actions/products/ProductActions";

function List({ getProducts, productsState }) {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
