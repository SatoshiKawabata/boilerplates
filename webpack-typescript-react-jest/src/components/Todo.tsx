import * as React from "react";
const style = require("./Todo.css");

interface Props {
  text: string;
  done: boolean;
  id: string;
  onCheck: (checked: boolean) => void;
}

export default (props: Props) => (
  <div className={style.Todo}>
    <input
      type="checkbox"
      id={props.id}
      onChange={(e) => {
        props.onCheck(e.target.checked);
      }} />
    <label htmlFor={props.id} className={props.done ? style.done : ""}>{props.text}</label>
  </div>
);