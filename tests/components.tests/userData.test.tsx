import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import UserData from "../../src/components/UserData/UserData";

describe("Index page", () => {
  it("should render", () => {
    const data = {
      viewer: {
        avatarUrl: "",
        login: "stich",
      },
    };
    render(<UserData userData={data} />);

    expect(screen.getByText(/stich/i)).toBeInTheDocument();
  });
});
