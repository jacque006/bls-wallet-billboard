// eslint-disable-next-line no-use-before-define
import * as React from "react";

import ReactDOM from "react-dom";
import App from "./App";

window.addEventListener("load", () => {
  ReactDOM.render(<App />, document.getElementById("app"));
});
