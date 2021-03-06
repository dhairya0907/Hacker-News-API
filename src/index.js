import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import routes from "../src/Configurations/Routes";

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById("root")
);
