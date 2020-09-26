import React, { useEffect } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";

import ProductCart from "../../components/ProductCart";
import { getProducts } from "../../redux/actions/products/ProductActions";
import "../../components/PaginationCustom.css";

function List({ getProducts, productsState }) {
  const {
    products,
    prodCurrentPage,
    prodPerPage,
    prodTotalPage,
  } = productsState;

  const [searchValue, setSearchValue] = React.useState("");

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = (pageNumber = 1, filterObject = {}) => {
    if (searchValue) {
      filterObject["title"] = searchValue;
    }
    getProducts(pageNumber, filterObject);
  };

  const onSearch = () => {
    if (!searchValue) {
      toast.error("enter a search text please!!");
      getProductsData(1);
      return;
    }
    getProductsData(1, { title: searchValue });
  };

  const searchInputClicked = () => {
    setSearchValue("");
  };

  return (
    <React.Fragment>
      <div className="flex w-full mt-4 mb-4 justify-between">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-11/12 h-10 border-agrisolidgreen border-2 pl-12 mr-1"
          placeholder="search for product ..."
        />
        <div
          onClick={searchInputClicked}
          className="flex items-center z-10 absolute text-gray-600 font-bold p-3 cursor-pointer"
        >
          <i className="fas fa-times-circle"></i>
        </div>
        <button
          onClick={onSearch}
          className="w-1/12 bg-agrisolidgreen text-agribackgroung font-bold "
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {products.length === 0 && <p>No product listings</p>}
        {products.map((product) => (
          <React.Fragment key={product.id}>
            <ProductCart product={product} />
          </React.Fragment>
        ))}
      </div>
      <div className="mb-5">
        <Pagination
          itemClass="page-item"
          firstPageText="First"
          lastPageText="Last"
          linkClass="page-link"
          activePage={prodCurrentPage}
          totalItemsCount={prodTotalPage}
          itemsCountPerPage={prodPerPage}
          onChange={(pageNumber) => getProductsData(pageNumber)}
        />
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  productsState: state.productsReducer,
});

export default connect(mapStateToProps, { getProducts })(List);
