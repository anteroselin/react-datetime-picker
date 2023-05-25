import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import moment from "moment-timezone";

import Month from "components/Month";
import CButton from "components/CButton";
import TimePicker from "components/Timepicker";
import TimezonePicker from "components/TimezonePicker";

import useClickOutside from "hooks";

import { displayDate, parseOptionalDate } from "utils";

import { ButtonType } from "types/button.types";
import { TimePickerRef } from "types/timepicker.types";
import { DATE, NavigationAction } from "types/general.types";
import { DatetimePickerProps, DatetimePickerRef } from "types/datetimepicker.types";

import "./datetime-picker.scss";

const DatetimePicker = forwardRef<DatetimePickerRef, DatetimePickerProps>(function DatetimePicker(
  { initialDate, minDate, maxDate, showTime = false, showTimezone = false, format, onChange },
  ref
) {
  const today = new Date();

  const [open, setOpen] = useState(false);
  const [timezone, setTimezone] = useState(moment.tz.guess());

  const minDateValid = parseOptionalDate(minDate, moment(today).subtract(10, DATE.YEAR).toDate());
  const maxDateValid = parseOptionalDate(maxDate, moment(today).add(10, DATE.YEAR).toDate());

  const [currentMonth, setCurrentMonth] = useState<Date>(initialDate ?? today);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate ?? today);

  const [hoverDay, setHoverDay] = useState<Date>();

  const [formattedDate, setFormattedDate] = useState<string>(() => {
    if (initialDate) {
      return displayDate(initialDate, moment(initialDate).format("HH:mm"), true, true, timezone, format);
    }
    return displayDate(today, moment(today).format("HH:mm"), true, true, timezone, format);
  });

  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (initialDate) {
      return displayDate(initialDate, moment(initialDate).format("HH:mm"), true, true, timezone);
    }
    return displayDate(today, moment(today).format("HH:mm"), true, true, timezone);
  });

  const timeRef = useRef<TimePickerRef | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [inputRect, setInputRect] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const [adjustedPosition, setAdjustedPosition] = useState({
    left: 0,
    top: 0,
    opacity: 0,
  });

  useImperativeHandle(ref, () => ({
    value() {
      return formattedDate;
    },
  }));

  useClickOutside(menuRef, () => {
    if (open) setOpen(false);
  });

  const onDayClick = useCallback(
    (day: Date) => {
      setSelectedDate(day);
    },
    [setSelectedDate]
  );

  const onDayHover = useCallback(
    (date: Date) => {
      if (!hoverDay || !moment(date).isSame(hoverDay)) {
        setHoverDay(date);
      }
    },
    [hoverDay]
  );

  const onMonthNavigate = useCallback(
    (action: NavigationAction) => {
      const newMonth = moment(currentMonth).add(action, DATE.MONTH).toDate();
      setCurrentMonth(newMonth);
    },
    [currentMonth]
  );

  const handleChangeTimezone = (tz: string) => setTimezone(tz);

  const isHover = useCallback(
    (day: Date): boolean => {
      return !!hoverDay && moment(hoverDay).isSame(day, DATE.DAY);
    },
    [hoverDay]
  );

  const helpers = useMemo(() => ({ isHover }), [isHover]);

  const handleApply = () => {
    const startTime = showTime ? timeRef.current?.value() : "00:00";

    const convertedDate = displayDate(selectedDate, startTime, showTime, true, timezone, format);

    setDisplayValue(displayDate(selectedDate, startTime, showTime, true, timezone));
    setFormattedDate(convertedDate);

    const newDate = moment(convertedDate).local().toDate();

    setSelectedDate(newDate);
    onChange(newDate);

    setOpen(false);
  };

  const handlers = useMemo(
    () => ({
      onDayClick,
      onDayHover,
      onMonthNavigate,
    }),
    [onDayClick, onDayHover, onMonthNavigate]
  );

  const adjustMenuPosition = useCallback(() => {
    const menuRect = menuRef.current?.getBoundingClientRect();

    if (!menuRect || !inputRect) {
      return;
    }

    const { innerWidth, innerHeight } = window;
    const buffer = 8; // add a small buffer to avoid the edges of the viewport

    const newMenuPosition = { ...menuPosition };
    // Check if the menu overflows to the right
    if (inputRect.left + menuRect.width + buffer > innerWidth) {
      newMenuPosition.left = inputRect.width - menuRect.width;
    } else {
      newMenuPosition.left = 0;
    }

    // Check if the menu overflows to the bottom
    if (inputRect.top + inputRect.height + menuRect.height + buffer > innerHeight) {
      newMenuPosition.top = -menuRect.height - buffer;
    } else {
      newMenuPosition.top = inputRect.height + buffer;
    }

    setAdjustedPosition({ ...newMenuPosition, opacity: 1 });
  }, [inputRect, menuPosition]);

  useEffect(() => {
    adjustMenuPosition();
  }, [adjustMenuPosition]);
  return (
    <div className="date-time-picker">
      <input
        className="date-time-input"
        value={displayValue}
        readOnly
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setInputRect(rect);
          setMenuPosition({ left: rect.left, top: rect.bottom });
          setOpen(true);
        }}
        onFocus={() => {
          if (selectedDate) onChange(selectedDate);
        }}
        placeholder="YYYY-MM-DD"
        data-testid="datetime-picker"
      />
      {open && (
        <div ref={menuRef} className={`menu-container`} style={adjustedPosition}>
          <div className="menu-months-container">
            <Month
              date={selectedDate}
              minDate={minDateValid}
              maxDate={maxDateValid}
              helpers={helpers}
              handlers={handlers}
              value={currentMonth}
              setValue={setCurrentMonth}
            />
          </div>
          {showTime && (
            <div className="menu-times-container">
              <div className="menu-time-picker-container">
                <div className="menu-time-picker">
                  <span>Set a time</span>
                  <TimePicker
                    ref={timeRef}
                    hour={moment(formattedDate).tz(timezone).format("HH")}
                    minute={moment(formattedDate).tz(timezone).format("mm")}
                  />
                </div>
              </div>
              {showTimezone && (
                <div className="menu-timezone-picker-container">
                  <TimezonePicker onSelect={handleChangeTimezone} selectedTimezone={timezone} />
                </div>
              )}
            </div>
          )}

          <div className="menu-footer">
            <CButton value="Cancel" onClick={() => setOpen(false)} />
            <CButton value="Apply" variant={ButtonType.Primary} onClick={handleApply} />
          </div>
        </div>
      )}
    </div>
  );
});

export default DatetimePicker;
