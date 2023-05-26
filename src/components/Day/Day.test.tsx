import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Day from ".";
import moment from "moment";
import { DateFormat } from "types/general.types";

describe("Day", () => {
  const mockOnClick = jest.fn();
  const mockOnHover = jest.fn();
  const mockDate = new Date();

  test("should render day correctly", () => {
    render(
      <Day
        filled={true}
        outlined={false}
        disabled={false}
        highlighted={false}
        isCurrentMonth={true}
        onClick={mockOnClick}
        onHover={mockOnHover}
        value={mockDate}
      />
    );

    const dayButton = screen.getByTestId(moment().format(DateFormat.ISO8601));

    expect(dayButton).toBeInTheDocument();
  });

  test("should call onClick when clicked", () => {
    render(
      <Day
        filled={true}
        outlined={false}
        disabled={false}
        highlighted={false}
        isCurrentMonth={true}
        onClick={mockOnClick}
        onHover={mockOnHover}
        value={mockDate}
      />
    );

    const dayButton = screen.getByTestId(moment().format(DateFormat.ISO8601));
    fireEvent.click(dayButton);

    expect(mockOnClick).toHaveBeenCalled();
  });

  test("should call onHover when hovered", () => {
    render(
      <Day
        filled={true}
        outlined={false}
        disabled={false}
        highlighted={false}
        isCurrentMonth={true}
        onClick={mockOnClick}
        onHover={mockOnHover}
        value={mockDate}
      />
    );

    const dayButton = screen.getByTestId(moment().format(DateFormat.ISO8601));
    fireEvent.mouseOver(dayButton);

    expect(mockOnHover).toHaveBeenCalled();
  });

  test("should be disabled when disabled or not in current month", () => {
    render(
      <Day
        filled={true}
        outlined={false}
        disabled={true}
        highlighted={false}
        isCurrentMonth={false}
        onClick={mockOnClick}
        onHover={mockOnHover}
        value={mockDate}
      />
    );

    const dayButton = screen.getByTestId(moment().format(DateFormat.ISO8601));

    expect(dayButton).toBeDisabled();
  });
});
