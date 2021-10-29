import React from "react";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CreateRepo from "../../src/components/modals/CreateRepo";

const handleClick = jest.fn();
const create = jest.fn();

describe("create repo", () => {
  beforeEach(() => {
    render(<CreateRepo handleModal={handleClick} create={create} />);
  });
  afterEach(() => {
    cleanup();
  });

  test("check render", () => {
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/create/i)).toBeInTheDocument();

    const nameRepo = screen.getByLabelText("name-repo");
    fireEvent.change(nameRepo, { target: { value: "testing" } });
    expect(nameRepo.value).toBe("testing");

    fireEvent.click(screen.getByText(/create/i));
    expect(create).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByText(/cancel/i));
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  // test("click cancel", () => {
  //   // expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  //   // // fireEvent.click(cancel);
  //   // // expect(handleClick).toHaveBeenCalledTimes(1);
  // });
});
