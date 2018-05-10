import * as React from "react";
const style = require("./Todo.css");

interface Props {
  text: string;
  done: boolean;
  onCheck: (checked: boolean) => void;
}

export default (props: Props) => (
  <div className={style.Todo}>
    <p>{props.text}</p>
    <input type="checkbox" onChange={(e) => {
      props.onCheck(e.target.checked);
    }}></input>
  </div>
);