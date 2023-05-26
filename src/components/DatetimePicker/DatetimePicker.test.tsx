import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import moment from "moment-timezone";
import DatetimePicker from ".";
import { DatetimePickerRef } from "types/datetimepicker.types";
import { DateFormat } from "types/general.types";

describe("DateTimeRangePicker", () => {
  const ref = React.createRef<DatetimePickerRef>();
  const mockOnChange = jest.fn();
  const today = new Date();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns the correct date when select date", () => {
    render(<DatetimePicker ref={ref} onChange={mockOnChange} />);
    fireEvent.click(screen.getByTestId("datetime-picker"));
    // Open the picker
    const testDate = `${moment(today).format("YYYY")}-${moment(today).format("MM")}-05`;
    // Assume the dates are in the visible month and the component is smart enough to pick the dates
    // Select the start date
    fireEvent.click(screen.getByTestId(testDate));
    // Click the apply button
    fireEvent.click(screen.getByText("Apply"));

    // Check the dates are correct
    expect(ref.current?.value()).toEqual(moment(testDate).format("YYYY-MM-DD"));
  });

  test("check selected timezone", async () => {
    render(
      <DatetimePicker
        ref={ref}
        onChange={mockOnChange}
        showTime={true}
        showTimezone={true}
        format={DateFormat.RFC3999}
      />
    );
    // Open the picker
    fireEvent.click(screen.getByTestId("datetime-picker"));

    const selectWrapper = screen.getByTestId("timezone-picker");
    const input = selectWrapper.firstChild as HTMLElement;
    fireEvent.keyDown(input, { keyCode: 40 });

    const option = await screen.findByText("UTC +00:00");
    fireEvent.click(option);

    const testIdDate = `${moment(today).format("YYYY")}-${moment(today).format("MM")}-05`;

    const testTime = "08:00";

    fireEvent.click(screen.getByTestId(testIdDate));

    fireEvent.change(screen.getByTestId("time-picker"), {
      target: { value: testTime },
    });

    // Click the apply button
    fireEvent.click(screen.getByText("Apply"));

    expect(ref.current?.value()).toEqual(moment.tz(`${testIdDate} ${testTime}`, "UTC").format(DateFormat.RFC3999));
  });

  test("check default timezone matches browsers one", async () => {
    render(<DatetimePicker ref={ref} onChange={mockOnChange} showTime={true} format={DateFormat.RFC3999} />);
    // Open the picker
    fireEvent.click(screen.getByTestId("datetime-picker"));

    const testIdDate = `${moment(today).format("YYYY")}-${moment(today).format("MM")}-05`;

    const testTime = "08:00";

    fireEvent.click(screen.getByTestId(testIdDate));

    fireEvent.change(screen.getByTestId("time-picker"), {
      target: { value: testTime },
    });

    // Click the apply button
    fireEvent.click(screen.getByText("Apply"));

    expect(ref.current?.value()).toEqual(
      moment.tz(`${testIdDate} ${testTime}`, moment.tz.guess()).format(DateFormat.RFC3999)
    );
  });
});
