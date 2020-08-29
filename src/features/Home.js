import React from "react";

import "./Home.css";

import Banner from "../components/Banner";
import ServicesCard from "../components/ServicesCard";
import TitleHolder from "../components/TitleHolder";
import AgriWithUs from "../components/AgriWithUs";
import Button from "../components/Button";

import subbg from "../static/subbg.png";

function Home() {
  return (
    <div className="home">
      <div className="home_bannerOne">
        <Banner />
      </div>
      <div style={{ marginBottom: "70px" }}>
        <TitleHolder service="OUR SERVICES" customWidth="11%" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ServicesCard
            icon="fas fa-tractor"
            title="<h4>Selling  and buying <br /> of agricultural <br />
              inputs
              </h4>"
          />
          <ServicesCard
            icon="fas fa-luggage-cart"
            title="<h4>
          Farm tools sales <br /> hire and <br /> maintenance
        </h4>"
          />
          <ServicesCard
            icon="far fa-handshake"
            title="<h4>Consultation with <br /> qualified <br /> agronomist</h4>"
          />
        </div>
      </div>
      <div
        style={{
          height: "600px",
          backgroundColor: "#ffffff",
          marginLeft: "-25px",
          marginRight: "-25px",
          padding: "30px",
          marginBottom: "40px",
        }}
      >
        <TitleHolder service="AGRICULTURE WITH US" customWidth="17%" />
        <div>
          <AgriWithUs />
          <AgriWithUs />
          <AgriWithUs />
          <AgriWithUs />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "30px",
          height: "230px",
          backgroundImage: `url(${subbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginLeft: "-25px",
          marginRight: "-25px",
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
            style={{ width: "80%", paddingLeft: "20px" }}
            placeholder="email address e.g okumujustine01@gmail.com"
          />
          <Button
            title="Subscribe"
            backgroundColor="#206A5D"
            btnTextColor="#ffffff"
          />
        </div>
      </div>
      <div
        style={{
          height: "150px",
          backgroundColor: "#206A5D",
          marginLeft: "-27px",
          marginRight: "-27px",
        }}
      >
        footer
      </div>
      <div
        style={{
          backgroundColor: "rgb(2,2,2, 0.7)",
          marginLeft: "-27px",
          marginRight: "-27px",
          textAlign: "center",
          padding: "5px",
          borderTop: "1px solid black",
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        © 2020 Agro Heights Tech Limited, Yes, all rights
      </div>
    </div>
  );
}

export default Home;
