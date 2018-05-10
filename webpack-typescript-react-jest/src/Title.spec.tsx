import * as React from "react";
import * as ReactDOM from "react-dom";
import Title from "./Title";

describe("Title component test.", () => {
  beforeEach(done => {
    ReactDOM.render(
      <Title />,
      document.body,
      done
    );
  });

  it("should render correctly.", () => {
    const title = document.querySelector("h1");
    expect(title.textContent).toBe("HelloWorld");
    expect(title.className).toBe("title");
  });
});