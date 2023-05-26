import { render, screen, fireEvent } from "@testing-library/react";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { ButtonType } from "types/button.types";
import CButton from ".";

describe("CButton", () => {
  const mockOnClick = jest.fn();

  const mockComponent = (
    <CButton
      onClick={mockOnClick}
      value="Test Button"
      iconName={faCoffee}
      testid="test-button"
      variant={ButtonType.Secondary}
      disabled={false}
    />
  );

  test("renders button correctly", () => {
    render(mockComponent);

    const button = screen.getByTestId("test-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("c-button");
    expect(button).toHaveClass(ButtonType.Secondary);
    expect(button).not.toHaveClass("disabled");
    expect(button).toHaveAttribute("aria-disabled", "false");
  });

  test("button click triggers onClick function", () => {
    render(mockComponent);

    const button = screen.getByTestId("test-button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  test("button is disabled", () => {
    render(
      <CButton
        onClick={mockOnClick}
        value="Test Button"
        iconName={faCoffee}
        testid="test-button"
        variant={ButtonType.Secondary}
        disabled={true}
      />
    );

    const button = screen.getByTestId("test-button");
    expect(button).toHaveClass("disabled");
    expect(button).toHaveAttribute("aria-disabled", "true");
  });
});
