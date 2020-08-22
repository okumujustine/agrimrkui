import React from "react";

import Button from "../components/Button";
import { deepGreen, white } from "../components/Colors";
import "./Banner.css";
import agpng from "../static/agpng.png";

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner_secOne">
        <div>
          <h1 style={{ color: deepGreen }}>
            The best and easiest way to carry out modern
            <br />
            Agriculture activities with <br />
            Ease.
          </h1>
        </div>
        <div>
          <p className="banner_subHeading">
            Market your products and buy equiptments that will <br /> increase
            your agricultural value.
          </p>
        </div>
        <div className="banner_buttonGroup">
          <Button
            title="REGISTER NOW"
            backgroundColor={deepGreen}
            btnTextColor={white}
            brdRadius={50}
          />
          <Button title="START SHOPPING" mrgLetf={5} brdRadius={50} />
        </div>
      </div>
      <div className="banner_secTwo">
        {/* <img src={agpng} className="banner_img" alt="banner image one" /> */}
      </div>
    </div>
  );
}
