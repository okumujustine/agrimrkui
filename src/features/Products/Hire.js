import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../../redux/actions/products/ProductActions";
import HireCards from "../../components/HireCards";

function Hire({ getProducts, productsState }) {
  React.useEffect(() => {
    getProducts();
  }, []);
  console.log(productsState);
  return (
    <div className="flex justify-between">
      <div className="w-2/12">search</div>
      <div className="w-10/12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {productsState.products.map((product) => (
          <React.Fragment key={product.id}>
            <HireCards product={product} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  productsState: state.productsReducer,
});

export default connect(mapStateToProps, { getProducts })(Hire);
