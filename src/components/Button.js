import React from "react";

import "./Button.css";
import { deepGreen, light } from "./Colors";

export default function Button(props) {
  const { title, backgroundColor, btnTextColor, mrgLetf, brdRadius } = props;
  return (
    <div>
      <button
        style={{
          borderRadius: brdRadius ? brdRadius : 0,
          width: 150,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
          fontWeight: 600,
          marginLeft: mrgLetf ? mrgLetf : 0,
          color: btnTextColor ? btnTextColor : deepGreen,
          border: `2px solid ${deepGreen}`,
          backgroundColor: backgroundColor ? backgroundColor : light,
        }}
      >
        {title}
      </button>
    </div>
  );
}
