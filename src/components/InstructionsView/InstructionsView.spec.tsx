import { render } from "@testing-library/react";
import { InstructionsView } from "./InstructionsView";

describe("test InstructionsView.tsx", () => {
  it("should match the snapshot", () => {
    const { asFragment } = render(<InstructionsView />);
    expect(asFragment()).toMatchSnapshot();
  });
});
