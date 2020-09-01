import React from "react";
import List from "../products/List";

import "./Shop.css";
import Button from "../../components/Button";
import { deepGreen, white } from "../../components/Colors";
import Footer from "../../components/Footer";

export default function ShopProducts() {
  return (
    <React.Fragment>
      <div className="home">
        <div className="shopping_searchProducts">
          <input
            className="shopping_searchInput"
            placeholder="search for product ..."
          />
          <Button
            title="Search"
            brdRadius={0}
            backgroundColor={deepGreen}
            btnTextColor={white}
          />
        </div>
        <div className="shopping_searchList">
          <div className="shopping_search">search section</div>
          <div className="shopping_listing">
            <List />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
