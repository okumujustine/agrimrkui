import React from "react";
import { Link } from "react-router-dom";

import "./BannerCustom.css";

export default function Banner() {
  return (
    <div>
      <div className="flex items-center mb-4 flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row">
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
          <h1 className="text-4xl text-agrisolidgreen font-bold">
            The best and easiest way to carry out modern
            <br />
            Agricultural activities with <br />
            Ease.
          </h1>
          <p className="pt-5 text-beautifulgray">
            Market your products and buy equiptments that will <br /> increase
            your agricultural value.
          </p>
          <div className="pt-5 flex">
            <button className="text-white font-bold py-2 px-4 rounded-full bg-agrisolidgreen hover:bg-agribackgroung hover:text-agrisolidgreen hover:border-agrisolidgreen border-2">
              REGISTER NOW
            </button>
            <Link
              to="/shop"
              className=" focus:outline-none ml-2 sm:ml-10 text-agrisolidgreen font-bold py-2 px-4 rounded-full border-agrisolidgreen border-solid border-2 hover:bg-agrisolidgreen hover:text-agribackgroung"
            >
              START SHOPPING
            </Link>
          </div>
        </div>
        <div className="hidden sm:hidden md:block lg:block xl:block w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 banner_backgroundImage h-400 xl:h-400"></div>
      </div>
    </div>
  );
}
