import * as React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { fetchHireList } from "../../redux/actions/orders/ordersAction";
import Pagination from "react-js-pagination";

function HireList({ ordersState, fetchHireList }) {
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
    // filterObject["title"] = searchValue;
    fetchHireList(pageNumber, filterObject);
  };

  return (
    <>
      <div className="flex justify-center">
        <table class="bg-white">
          <tr>
            <th class="bg-green-200 border text-left px-8 py-4">Id</th>
            <th class="bg-green-200 border text-left px-8 py-4">Hire Number</th>
            <th class="bg-green-200 border text-left px-8 py-4">Product</th>
            <th class="bg-green-200 border text-left px-8 py-4">Status</th>
            <th class="bg-green-200 border text-left px-8 py-4">Given on</th>
            <th class="bg-green-200 border text-left px-8 py-4">Return on</th>
            <th class="bg-green-200 border text-left px-8 py-4">Address</th>
            <th class="bg-green-200 border text-left px-8 py-4"> Contact</th>
          </tr>
          {hireList.map((hireListItem, index) => (
            <tr key={hireListItem.id}>
              <td class="border px-8 py-4">{index + 1}</td>
              <td class="border px-8 py-4">{hireListItem.hire_number}</td>
              <td class="border px-8 py-4">{hireListItem.product_name}</td>
              <td class="border px-8 py-4">
                {hireListItem.status}
                {"  "}
                {hireListItem.status == "pending" ? (
                  <i className="fas fa-circle text-orange-500"></i>
                ) : hireListItem.status == "approved" ? (
                  <i className="fas fa-circle text-green-600"></i>
                ) : (
                  <i className="fas fa-circle text-red-700"></i>
                )}{" "}
              </td>
              <td class="border px-8 py-4">
                {hireListItem.given_date !== null
                  ? hireListItem.given_date
                  : "Not given"}
              </td>
              <td class="border px-8 py-4">
                {moment(hireListItem.return_date).format("YYYY-MM-DD HH:mm:ss")}
              </td>
              <td class="border px-8 py-4">{hireListItem.address}</td>
              <td class="border px-8 py-4">{hireListItem.phone}</td>
            </tr>
          ))}
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
    </>
  );
}

const mapStateToProps = (state) => ({
  ordersState: state.ordersReducer,
});

export default connect(mapStateToProps, { fetchHireList })(HireList);
