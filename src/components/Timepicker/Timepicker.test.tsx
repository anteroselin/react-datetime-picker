import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimePicker from ".";
import { TimePickerRef } from "types/timepicker.types";

describe("TimePicker", () => {
  test("should correctly display the initial time", () => {
    const ref = React.createRef<TimePickerRef>();
    render(<TimePicker hour="10" minute="30" ref={ref} />);

    const timePickerInput = screen.getByTestId("time-picker") as HTMLInputElement;

    expect(timePickerInput.value).toBe("10:30:00");
  });

  test("should correctly update the time when changed", () => {
    const ref = React.createRef<TimePickerRef>();
    render(<TimePicker hour="10" minute="30" ref={ref} />);

    const timePickerInput = screen.getByTestId("time-picker") as HTMLInputElement;

    fireEvent.change(timePickerInput, { target: { value: "11:45" } });

    expect(timePickerInput.value).toBe("11:45:00");
  });

  test("should correctly return the current time value from the ref", () => {
    const ref = React.createRef<TimePickerRef>();
    render(<TimePicker hour="10" minute="30" ref={ref} />);

    expect(ref.current?.value()).toBe("10:30");

    fireEvent.change(screen.getByTestId("time-picker"), { target: { value: "11:45" } });

    expect(ref.current?.value()).toBe("11:45");
  });
});
