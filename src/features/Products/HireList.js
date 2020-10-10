import * as React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

import { fetchHireList } from "../../redux/actions/orders/ordersAction";
import Pagination from "react-js-pagination";

function HireList({ ordersState, fetchHireList }) {
  const [searchValue, setSearchValue] = React.useState("");
  const {
    hireList,
    hireListCurrentPage,
    hireListPerPage,
    hireListTotalPage,
  } = ordersState;

  React.useEffect(() => {
    getHireListData();
  }, []);

  const getHireListData = (pageNumber = 1, filterObject = {}) => {
    if (searchValue) {
      filterObject["title"] = searchValue;
    }
    fetchHireList(pageNumber, filterObject);
  };

  const clearSearchInputClicked = () => {
    setSearchValue("");
  };

  const onSearch = async () => {
    if (!searchValue) {
      toast.error("enter a search text please!!");
      await getHireListData(1);
      return;
    }
    await getHireListData(1, { title: searchValue });
  };

  return (
    <div className="flex items-center flex-col">
      <div>
        <div className="flex w-full mt-4 mb-4 justify-between">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-11/12 h-10 border-agrisolidgreen border-2 pl-12 mr-1 bg-white"
            placeholder="search hire product ..."
          />
          <div
            onClick={clearSearchInputClicked}
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

        <table className="bg-white">
          <thead>
            <tr>
              <th className="bg-green-200 border text-left px-8 py-4">Id</th>
              <th className="bg-green-200 border text-left px-8 py-4">
                Hire Number
              </th>
              <th className="bg-green-200 border text-left px-8 py-4">
                Product
              </th>
              <th className="bg-green-200 border text-left px-8 py-4">
                Status
              </th>
              <th className="bg-green-200 border text-left px-8 py-4">
                Given on
              </th>
              <th className="bg-green-200 border text-left px-8 py-4">
                Return on
              </th>
              <th className="bg-green-200 border text-left px-8 py-4">
                Address
              </th>
              <th className="bg-green-200 border text-left px-8 py-4">
                {" "}
                Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {hireList.map((hireListItem, index) => (
              <tr key={hireListItem.id}>
                <td className="border px-8 py-4 font-bold">{index + 1}</td>
                <td className="border px-8 py-4">{hireListItem.hire_number}</td>
                <td className="border px-8 py-4">
                  {hireListItem.product_name}
                </td>
                <td className="border px-8 py-4 font-bold">
                  {"  "}
                  {hireListItem.status == "pending" ? (
                    <span className="text-orange-500">
                      {hireListItem.status} <i className="fas fa-circle"></i>
                    </span>
                  ) : hireListItem.status == "approved" ? (
                    <span className="text-green-600">
                      {hireListItem.status} <i className="fas fa-circle"></i>
                    </span>
                  ) : (
                    <span className="text-red-700">
                      {hireListItem.status} <i className="fas fa-circle"></i>
                    </span>
                  )}{" "}
                </td>
                <td className="border px-8 py-4">
                  {hireListItem.given_date !== null
                    ? hireListItem.given_date
                    : "Not given"}
                </td>
                <td className="border px-8 py-4">
                  {`${moment(
                    hireListItem.given_date
                      ? hireListItem.given_date
                      : hireListItem.needed_date
                  ).to(hireListItem.return_date)}`}
                </td>
                <td className="border px-8 py-4">{hireListItem.address}</td>
                <td className="border px-8 py-4">{hireListItem.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-5 mt-5">
        <Pagination
          itemClass="page-item"
          firstPageText="First"
          lastPageText="Last"
          linkClass="page-link"
          activePage={hireListCurrentPage}
          totalItemsCount={hireListTotalPage}
          itemsCountPerPage={hireListPerPage}
          onChange={(pageNumber) => getHireListData(pageNumber)}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ordersState: state.ordersReducer,
});

export default connect(mapStateToProps, { fetchHireList })(HireList);
