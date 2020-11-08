import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "react-phone-number-input/style.css";
import "react-medium-image-zoom/dist/styles.css";

import "./index.css";
import "./assets/main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store";
import Modal from "react-modal";

const alertOptions = {
  position: positions.TOP_LEFT,
  timeout: 2000,
  offset: "30px",
  transition: transitions.SCALE,
};

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
