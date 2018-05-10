import * as React from "react";
import * as ReactDOM from "react-dom";
import Todo from "./Todo";
import * as ReactTestUtils from 'react-dom/test-utils';
const container = document.createElement("div");
document.body.appendChild(container);

describe("TodoInput component test.", () => {
  let onCheck: (checked: boolean) => void = () => {};
  beforeAll(done => {
    ReactDOM.render(
      <Todo
        text="test"
        done={false}
        onCheck={checked => { onCheck(checked); }}
        />,
      container,
      done
    );
  });

  it("should render correctly.", () => {
    const p = document.querySelector("p");
    expect(p).toBeInstanceOf(HTMLParagraphElement);
    expect(p.textContent).toBe("test");
  });

  it("should call onCheck handler on click check box", done => {
    onCheck = checked => {
      expect(checked).toBe(true);
      done();
    };
    const input = document.querySelector(`input[type="checkbox"]`) as HTMLInputElement;
    input.click();
  });
});