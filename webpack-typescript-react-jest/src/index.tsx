import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import Title from "./Title";

ReactDOM.render(
  <Title />,
  document.body,
  () => {
    console.log("end");
  }
);