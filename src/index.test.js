import React from "react";
const ReactTestRenderer = require("react-test-renderer");
import { BaseComponent } from "./index.js";

describe("Snapshot test", () => {
  it("Should compare the component with a snapshot", () => {
    const component = ReactTestRenderer.create(<BaseComponent />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
