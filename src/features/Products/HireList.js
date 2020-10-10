import * as React from "react";
import { connect } from "react-redux";

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
      <div>
        {hireList.map((hireListItem) => (
          <p key={hireListItem.id}>sure</p>
        ))}
      </div>

      <div className="mb-5">
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
