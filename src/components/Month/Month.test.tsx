import { render, screen, fireEvent } from "@testing-library/react";
import moment from "moment";
import Month from ".";
import { getDaysInMonth } from "utils";
import { NavigationAction } from "types/general.types";
import { DateFormat } from "types/general.types";
import { DATE } from "types/general.types";

describe("Month component", () => {
  const mockDate = new Date();

  const mockHelpers = {
    isHover: jest.fn().mockReturnValue(false),
  };

  const mockHandlers = {
    onMonthNavigate: jest.fn(),
    onDayClick: jest.fn(),
    onDayHover: jest.fn(),
  };

  const component = (
    <Month
      helpers={mockHelpers}
      handlers={mockHandlers}
      value={mockDate}
      date={mockDate}
      setValue={jest.fn()}
      minDate={moment().subtract(1, DATE.MONTH).toDate()}
      maxDate={moment().add(1, DATE.MONTH).toDate()}
    />
  );

  test("renders header with the correct month and year", () => {
    render(component);

    expect(screen.getByText(moment(mockDate).format("MMMM YYYY"))).toBeInTheDocument();
  });

  test("renders all weekdays", () => {
    render(component);

    ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"].forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test("renders all days of the month", () => {
    render(component);

    getDaysInMonth(mockDate).forEach((day) => {
      expect(screen.getByTestId(moment(day).format(DateFormat.ISO8601))).toBeInTheDocument();
    });
  });

  test("navigates to the previous month when previous button is clicked", () => {
    render(component);

    fireEvent.click(screen.getByTestId("test-prev-month"));
    expect(mockHandlers.onMonthNavigate).toHaveBeenCalledWith(NavigationAction.Previous);
  });

  test("navigates to the next month when next button is clicked", () => {
    render(component);

    fireEvent.click(screen.getByTestId("test-next-month"));
    expect(mockHandlers.onMonthNavigate).toHaveBeenCalledWith(NavigationAction.Next);
  });

  test("handles day click", () => {
    render(component);

    const day = screen.getByTestId(moment(mockDate).format(DateFormat.ISO8601));
    fireEvent.click(day);
    expect(mockHandlers.onDayClick).toHaveBeenCalled();
  });

  test("handles day hover", () => {
    render(component);

    const day = screen.getByTestId(moment(mockDate).format(DateFormat.ISO8601));
    fireEvent.mouseOver(day);
    expect(mockHandlers.onDayHover).toHaveBeenCalled();
  });
});
