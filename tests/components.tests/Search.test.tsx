import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Search from "../../src/components/Search/Search";

describe("test search", () => {
  it("input ", () => {
    const funcTest = jest.fn();
    const text = "";
    render(<Search action={funcTest} placeholder={text} />);
    const input = screen.getByLabelText("search-input");
    fireEvent.change(input, { target: { value: "23" } });
    expect(input.value).toBe("23");
  });
});
