import * as React from "react";

interface IProps {
  onAdd: () => void;
  onChange: (todoText: string) => void;
}
export default (props: IProps) => {
  return (
    <div>
      <input type="text" onChange={e => {
        props.onChange((e.target as HTMLInputElement).value);
      }} />
      <button type="button" onClick={() => {
          props.onAdd();
        }}>add button</button>
    </div>
  );
};