import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Content from "../../src/components/Content/Content";
import { QueryClient, QueryClientProvider } from "react-query";

const data = {
  viewer: {
    login: "",
    avatarUrl: "",
  },
};

const queryClient = new QueryClient();

describe("test content", () => {
  beforeEach(() => {
    localStorage.setItem("token", "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");
    render(
      <QueryClientProvider client={queryClient}>
        <Content userData={data} />
      </QueryClientProvider>
    );
  });
  test("test create repo modal window", async () => {
    const button = screen.getByText(/New/i);
    expect(button).toBeInTheDocument();
    // fireEvent.click(button);
    // expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
  test("click sort", () => {
    const buttonSort = screen.getByText(/sort/i);
    fireEvent.click(buttonSort);
    expect(screen.getByText(/by Name/i)).toBeInTheDocument();
    expect(screen.getByText(/last update/i)).toBeInTheDocument();
    expect(screen.getByText(/stars/i)).toBeInTheDocument();
  });
  test("check pagination button", () => {
    const buttonForward = screen.queryByText(">>>");
    const buttonBack = screen.queryByText("<<<");
    expect(buttonForward).not.toBeInTheDocument();
    expect(buttonBack).not.toBeInTheDocument();
  });
});
