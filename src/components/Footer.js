import React from "react";

export default function Footer() {
  return (
    <div>
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

// var style = {
//   backgroundColor: "red",
//   borderTop: "1px solid #E7E7E7",
//   textAlign: "center",
//   padding: "20px",
//   //   position: "fixed",
//   left: "0",
//   bottom: "0",
//   height: "60px",
//   width: "100%",
// };

// var phantom = {
//   display: "block",
//   padding: "20px",
//   height: "60px",
//   width: "100%",
// };

// function Footer({ children }) {
//   return (
//     <div>
//       <div style={phantom} />
//       <div style={style}>{children}</div>
//     </div>
//   );
// }

// export default Footer;
