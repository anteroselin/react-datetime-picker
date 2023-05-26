import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import moment from "moment";
import Month from ".";
import { NavigationAction } from "types/general.types";

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
      minDate={moment().subtract(1, "month").toDate()}
      maxDate={moment().add(1, "month").toDate()}
    />
  );

  test("renders header with the correct month and year", () => {
    const { getByText } = render(component);

    expect(getByText(moment(mockDate).format("MMMM YYYY"))).toBeInTheDocument();
  });

  test("renders all weekdays", () => {
    const { getByText } = render(component);

    ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"].forEach((day) => {
      expect(getByText(day)).toBeInTheDocument();
    });
  });

  test("renders all days of the month", () => {
    render(component);

    Array.from({ length: moment(mockDate).daysInMonth() }, (_, i) => i + 1).forEach((day) => {
      expect(screen.getByText(day.toString())).toBeInTheDocument();
    });
  });

  // test("navigates to the previous month when previous button is clicked", () => {
  //   render(component);

  //   fireEvent.click(screen.getByLabelText("previous month"));
  //   expect(mockHandlers.onMonthNavigate).toHaveBeenCalledWith(NavigationAction.Previous);
  // });

  // test("navigates to the next month when next button is clicked", () => {
  //   render(component);

  //   fireEvent.click(screen.getByLabelText("next month"));
  //   expect(mockHandlers.onMonthNavigate).toHaveBeenCalledWith(NavigationAction.Next);
  // });

  // test("handles day click", () => {
  //   render(component);

  //   const day = screen.getByText("1");
  //   fireEvent.click(day);
  //   expect(mockHandlers.onDayClick).toHaveBeenCalled();
  // });

  // test("handles day hover", () => {
  //   render(component);

  //   const day = screen.getByTestId(moment().format("YYYY-MM-DD").toString());
  //   fireEvent.mouseOver(day);
  //   expect(mockHandlers.onDayHover).toHaveBeenCalled();
  // });
});
