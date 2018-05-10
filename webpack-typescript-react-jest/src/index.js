import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const h1 = React.createElement("h1", {
  className: "title"
}, "HelloWorld");

ReactDOM.render(
  h1,
  document.body
);