import * as React from "react";

import "./Home.css";

import Banner from "../components/Banner";
import ServicesCard from "../components/ServicesCard";
import TitleHolder from "../components/TitleHolder";
import AgriWithUs from "../components/AgriWithUs";
import Button from "../components/Button";

import subbg from "../static/subbg.png";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Banner />
      <div>
        <h1 className="text-agrisolidgreen underline font-bold pb-10">
          OUR SERVICES
        </h1>
        <div className="mb-8 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row md:justify-around lg:justify-around  xl:justify-around sm:justify-around">
          <ServicesCard
            icon="fas fa-tractor"
            title="<h4>Selling  and buying <br /> of agricultural <br />
              inputs
              </h4>"
          />
          <ServicesCard
            icon="fas fa-luggage-cart"
            title="<h4>Selling  and buying <br /> of agricultural <br />
              inputs
              </h4>"
          />
          <ServicesCard
            icon="fas fa-handshake"
            title="<h4>Selling  and buying <br /> of agricultural <br />
              inputs
              </h4>"
          />
        </div>
      </div>
      <div>
        <h1 className="text-agrisolidgreen underline font-bold pb-5">
          AGRICULTURE WITH US
        </h1>
        <AgriWithUs />
        <AgriWithUs />
        <AgriWithUs />
        <AgriWithUs />
      </div>
      <div>
        <div
          className="flex flex-col justify-center items-center"
          style={{
            paddingBottom: "30px",
            height: "230px",
            backgroundImage: `url(${subbg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h3 style={{ color: "#206A5D", paddingBottom: "15px" }}>
            SUBSCRIBE TO GET UPDATES
          </h3>
          <div
            style={{
              display: "flex",
              width: "70%",
              justifyContent: "space-between",
            }}
          >
            <input
              className="w-full pl-5 h-12 mr-3"
              placeholder="email address e.g okumujustine01@gmail.com"
            />
            <button className="bg-agrisolidgreen text-white p-3">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
