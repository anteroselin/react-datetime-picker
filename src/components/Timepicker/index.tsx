import React, { useState, forwardRef, useImperativeHandle } from "react";

import { Props, TimePickerRef } from "types/timepicker.types";

import "./time-picker.scss";

const TimePicker = forwardRef<TimePickerRef, Props>(function TimePicker({ hour, minute }, ref) {
  const [time, setTime] = useState({
    hour: hour,
    minute: minute,
  });

  useImperativeHandle(ref, () => ({
    value() {
      return `${time.hour}:${time.minute}`;
    },
  }));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const [hour, minute] = inputValue.split(":");
    const formattedHour = hour ? hour : "00";
    const formattedMinute = minute ? minute : "00";
    setTime({ hour: formattedHour, minute: formattedMinute });
  };

  return (
    <div className="time-picker">
      <input
        data-testid="time-picker"
        type="time"
        value={`${time.hour}:${time.minute}:00`}
        onChange={handleInputChange}
      />
    </div>
  );
});

export default TimePicker;
