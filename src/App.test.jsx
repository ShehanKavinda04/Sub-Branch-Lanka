import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Featured Products heading", () => {
  render(<App />);
  const heading = screen.getByText(/featured products/i);
  expect(heading).toBeInTheDocument();
});
