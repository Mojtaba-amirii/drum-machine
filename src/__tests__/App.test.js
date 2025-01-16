import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import App from "../components/App";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const mainElement = screen.getByTestId("drum-machine");
  expect(mainElement).toBeInTheDocument();
});
