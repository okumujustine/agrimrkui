import React from "react";

export default function TitleHolder({ service, customWidth }) {
  return (
    <div>
      <h3
        style={{
          color: "#206A5D",
          borderBottom: "2px solid #206A5D",
          width: customWidth,
          textAlign: "center",
        }}
      >
        {service}
      </h3>
    </div>
  );
}
