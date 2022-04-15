// eslint-disable-next-line no-use-before-define
import * as React from "react";

import ReactDOM from "react-dom";
// import App from "./App";
import StorageApp from "./StorageApp";

window.addEventListener("load", () => {
  ReactDOM.render(<StorageApp />, document.getElementById("app"));
  // ReactDOM.render(<App />, document.getElementById("app"));
});
