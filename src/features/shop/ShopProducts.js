import React from "react";
import List from "../products/List";

export default function ShopProducts() {
  return (
    <React.Fragment>
      <div className="flex flex-row justify-between">
        <div className="w-2/12">search area</div>
        <div className="w-10/12">
          <List />
        </div>
      </div>
    </React.Fragment>
  );
}
