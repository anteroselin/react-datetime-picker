import { render, screen, fireEvent } from "@testing-library/react";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { ButtonType } from "types/button.types";
import CButton from ".";

describe("CButton", () => {
  test("renders button correctly", () => {
    const mockOnClick = jest.fn();
    render(
      <CButton
        onClick={mockOnClick}
        value="Test Button"
        iconName={faCoffee}
        testid="test-button"
        variant={ButtonType.Secondary}
        disabled={false}
      />
    );

    const button = screen.getByTestId("test-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("c-button");
    expect(button).toHaveClass(ButtonType.Secondary);
    expect(button).not.toHaveClass("disabled");
    expect(button).toHaveAttribute("aria-disabled", "false");
  });

  test("button click triggers onClick function", () => {
    const mockOnClick = jest.fn();
    render(
      <CButton
        onClick={mockOnClick}
        value="Test Button"
        iconName={faCoffee}
        testid="test-button"
        variant={ButtonType.Secondary}
        disabled={false}
      />
    );

    const button = screen.getByTestId("test-button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  test("button is disabled", () => {
    const mockOnClick = jest.fn();
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
