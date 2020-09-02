import React from "react";

import cart from "../static/cart.png";
import consult from "../static/consult.png";
import tools from "../static/tools.png";

export default function ServicesCard({ title, icon }) {
  return (
    <div>
      <div className="flex flex-col items-center mb-10">
        <div className="mb-2 flex border-agrisolidgreen border-2 bg-white rounded-full h-40 w-40 items-center justify-center">
          {" "}
          <i className={`${icon} text-beautifulgray text-6xl`}></i>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: title }}
          className="mb-2 text-beautifulgray"
        />
        <button className="text-white font-bold py-2 px-4 rounded-full bg-agrisolidgreen">
          Get started
        </button>
      </div>
    </div>
  );
}
