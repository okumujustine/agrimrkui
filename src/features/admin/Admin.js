import React from "react";
import AddProduct from "./AddProduct";

export default function Admin() {
  return (
    <div className="flex">
      <div className="w-2/12 bg-agrisolidgreen">
        <h1>side nav</h1>
      </div>
      <div className="w-10/12">
        <div className="flex flex-col items-center w-full mb-5">
          <h2>admin</h2>
          <AddProduct />
        </div>
      </div>
    </div>
  );
}
