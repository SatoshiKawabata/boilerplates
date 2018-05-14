import * as React from "react";
import * as ReactDOM from "react-dom";
import TodoInput from "./TodoInput";
import * as ReactTestUtils from "react-dom/test-utils";
const container = document.createElement("div");
document.body.appendChild(container);

describe("TodoInput component test.", () => {
  let onAdd:() => void = () => {};
  let onChange:(todoText: string) => void = todoText => {};

  beforeAll(done => {
    ReactDOM.render(
      <TodoInput
        inputText=""
        onAdd={() => {
          onAdd();
        }}
        onChange={todoText => {
          onChange(todoText);
        }}/>,
      container,
      done
    );
  });

  it("should render correctly.", () => {
    const input = document.querySelector("input");
    expect(input).toBeInstanceOf(HTMLInputElement);
    const button = document.querySelector("button");
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  it("should call click handler on clck button.", done => {
    onAdd = () => {
      done();
    };
    const button = document.querySelector("button");
    button.click();
  });

  it("should call change handler on cahnge input value.", done => {
    onChange = todoText => {
      expect(todoText).toBe("test task");
      done();
    };
    const input = document.querySelector("input");
    input.value = "test task";
    ReactTestUtils.Simulate.change(input, { target: input });
  });
});