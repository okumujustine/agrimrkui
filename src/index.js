import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "react-phone-number-input/style.css";
import "react-medium-image-zoom/dist/styles.css";

import "./index.css";
import "./assets/main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store";
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
