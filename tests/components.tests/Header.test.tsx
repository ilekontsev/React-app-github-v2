import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../../src/components/Header/Header";

describe("test header", () => {
  it("test click on an item menu", () => {
    render(<Header />);
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });
});
