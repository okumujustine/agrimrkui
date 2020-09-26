import React from "react";
import { connect } from "react-redux";
import { getHireProducts } from "../../redux/actions/products/ProductActions";
import HireCards from "../../components/HireCards";

function Hire({ getHireProducts, productsState }) {
  React.useEffect(() => {
    getHireProducts();
  }, []);

  return (
    <React.Fragment>
      <div className="flex">
        <div className="w-2/12">
          <p>search</p>
        </div>
        <div className="w-10/12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {productsState.hireProducts.length === 0 && (
              <p>No product listings</p>
            )}
            {productsState.hireProducts.map((product) => (
              <React.Fragment key={product.id}>
                <HireCards product={product} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  productsState: state.productsReducer,
});

export default connect(mapStateToProps, { getHireProducts })(Hire);
