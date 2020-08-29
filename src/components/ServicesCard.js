import React from "react";

import cart from "../static/cart.png";
import consult from "../static/consult.png";
import tools from "../static/tools.png";

export default function ServicesCard({ title, icon }) {
  return (
    <div
      style={{
        // backgroundColor: "#ffffff",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "30%",
        padding: "30px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#ffffff",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #206A5D",
        }}
      >
        <div>
          <i
            className={icon}
            style={{ fontSize: "100px", color: "#767676" }}
          ></i>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <div
        style={{
          width: "50%",
          backgroundColor: "#206A5D",
          borderRadius: "50px",
          padding: "10px",
          textAlign: "center",
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        Get started
      </div>
    </div>
  );
}
