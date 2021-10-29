import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Table from "../../src/components/Table/Table";
import { Repo } from "../../src/Interfaces/Interfaces";

const data = [
  {
    repo: {
      id: "",
      name: "sara",
      primaryLanguage: { name: "" },
      updatedAt: "1T2",
      url: "",
      viewerHasStarred: false,
    },
  },
];

const updateStar = jest.fn();

describe("table test ", () => {
  beforeEach(() => {
    render(<Table data={data as [{ repo: Repo }]} updateStar={updateStar} />);
  });
  test("test output name", () => {
    expect(screen.queryByText(/sara/i)).toBeInTheDocument();
  });
  test("test output date", () => {
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });
  test("star or unstar", () => {
    expect(screen.queryByText(/star/i)).toBeInTheDocument();
  });
});
