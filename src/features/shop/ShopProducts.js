import React from "react";
import List from "../products/List";

export default function ShopProducts() {
  return (
    <React.Fragment>
      <div className="flex w-full mt-4 mb-4 justify-between">
        <input
          className="w-11/12 h-10 border-agrisolidgreen border-2 pl-3 mr-1"
          placeholder="search for product ..."
        />
        <button className="w-1/12 bg-agrisolidgreen text-agribackgroung font-bold ">
          Search
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-2/12">search area</div>
        <div className="w-10/12">
          {" "}
          <List />
        </div>
      </div>
    </React.Fragment>
  );
}
