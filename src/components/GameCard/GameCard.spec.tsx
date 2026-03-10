import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameCard } from "./GameCard";

describe("test GameCard.tsx", () => {
  it("should match the snapshot", () => {
    const { asFragment } = render(<GameCard />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should show SetupView on initial render", () => {
    render(<GameCard />);
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
    expect(screen.getByText(/choose no\. of rounds/i)).toBeInTheDocument();
  });

  it("should toggle instructions overlay on info button click", async () => {
    render(<GameCard />);
    const infoButton = screen.getByRole("button", { name: /how to play/i });
    await userEvent.click(infoButton);
    expect(screen.getByText("How to play")).toBeVisible();
    await userEvent.click(infoButton);
    expect(screen.queryByText("How to play")).not.toBeInTheDocument();
  });
});
