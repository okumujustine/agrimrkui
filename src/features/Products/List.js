import * as React from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import axios from "axios";

import { getProducts } from "../../redux/actions/products/ProductActions";
import "../../components/PaginationCustom.css";
import { baseUrl } from "../../common/constants";
import ProductCard from "../../components/ProductCard";

function List({ getProducts, productsState }) {
  const {
    products,
    prodCurrentPage,
    prodPerPage,
    prodTotalPage,
  } = productsState;

  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    async function fetchProductAndCategory() {
      await getProductsData();
    }

    fetchProductAndCategory();
  }, []);

  const getProductsData = (pageNumber = 1, filterObject = {}) => {
    filterObject["title"] = searchValue;
    getProducts(pageNumber, filterObject);
  };

  const onSearch = async (e) => {
    e.preventDefault();

    if (!searchValue) {
      toast.error("enter a search text please!!");
      await getProductsData(1);
      return;
    }
    await getProductsData(1, { title: searchValue });
  };

  const clearSearchInputClicked = () => {
    setSearchValue("");
  };

  const categorySearch = async (categorySearchValue) => {
    const sV = categorySearchValue.target.value;
    await getProductsData(1, { title: sV });
  };

  return (
    <React.Fragment>
      <div className="flex flex-row justify-between">
        <div className="w-1/12">
          <h5 className="pb-3 pt-2 font-bold text-agrisolidgreen underline">
            Categories
          </h5>
        </div>
        <div className="w-11/12">
          <form
            onSubmit={onSearch}
            className="flex w-full mt-4 mb-4 justify-between"
          >
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-11/12 h-10 border-agrisolidgreen border-2 pl-12 mr-1"
              placeholder="search for product ..."
            />
            <div
              onClick={clearSearchInputClicked}
              className="flex items-center z-10 absolute text-gray-600 font-bold p-3 cursor-pointer"
            >
              <i className="fas fa-times-circle"></i>
            </div>
            <button
              type="submit"
              className="w-1/12 bg-agrisolidgreen text-agribackgroung font-bold "
            >
              Search
            </button>
          </form>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {products.length === 0 && <p>No product listings</p>}
            {products.map((product) => (
              <React.Fragment key={product.id}>
                <ProductCard product={product} />
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
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  productsState: state.productsReducer,
});

export default connect(mapStateToProps, { getProducts })(List);
