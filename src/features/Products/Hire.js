import React from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";

import { getHireProducts } from "../../redux/actions/products/ProductActions";
import HireCards from "../../components/HireCards";
import "../../components/PaginationCustom.css";

function Hire({ getHireProducts, productsState }) {
  const {
    hireProducts,
    hireCurrentPage,
    hirePerPage,
    hireTotalPage,
  } = productsState;

  React.useEffect(() => {
    getHireData();
  }, []);

  const getHireData = (pageNumber = 1) => {
    getHireProducts(pageNumber);
  };

  return (
    <React.Fragment>
      <div className="flex">
        <div className="w-2/12">
          <p>search</p>
        </div>
        <div className="w-10/12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {hireProducts.length === 0 && <p>No product listings</p>}
            {hireProducts.map((product) => (
              <React.Fragment key={product.id}>
                <HireCards product={product} />
              </React.Fragment>
            ))}
          </div>
          <div className="mb-5">
            <Pagination
              itemClass="page-item"
              firstPageText="First"
              lastPageText="Last"
              linkClass="page-link"
              activePage={hireCurrentPage}
              totalItemsCount={hireTotalPage}
              itemsCountPerPage={hirePerPage}
              onChange={(pageNumber) => getHireData(pageNumber)}
            />
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
