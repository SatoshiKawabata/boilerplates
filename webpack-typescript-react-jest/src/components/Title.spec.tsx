import * as React from "react";
import * as ReactDOM from "react-dom";
import Title from "./Title";
const container = document.createElement("div");
document.body.appendChild(container);

describe("Title component test.", () => {
  beforeEach(done => {
    ReactDOM.render(
      <Title />,
      container,
      done
    );
  });

  it("should render correctly.", () => {
    const title = document.querySelector("h1");
    expect(title.textContent).toBe("HelloWorld");
  });
});
