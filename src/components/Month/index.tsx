import React, { FC } from "react";

import moment from "moment";
import _ from "lodash";

import Day from "../Day";
import { getDaysInMonth } from "utils";

import "./month.scss";

const WEEK_DAYS: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"];

interface MonthProps {
  value: Date;
  date: Date;
  minDate: Date;
  maxDate: Date;
  setValue: (date: Date) => void;
  helpers: {
    isHover: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
  };
}

const Month: FC<MonthProps> = ({ helpers, handlers, value, date, setValue, minDate, maxDate }) => {
  return (
    <div className="date-picker-month-root">
      <div className="month-week-days-container">
        {WEEK_DAYS.map((day) => (
          <span key={day} className="month-week-day">
            {day}
          </span>
        ))}
      </div>

      <div className="month-days-container">
        {_.chunk(getDaysInMonth(date), 7).map((week, index) => (
          <div key={index} className="month-week">
            {week.map((day) => {
              const isSelected = moment(date).isSame(day, "day");
              const highlighted = helpers.isHover(day);

              return (
                <Day
                  key={moment(day).format("YYYY-MM-DD")}
                  filled={isSelected}
                  outlined={!highlighted && moment().isSame(day, "day")}
                  highlighted={highlighted}
                  isCurrentMonth={moment(day).isSame(date, "month")}
                  disabled={!moment(day).isBetween(minDate, maxDate)}
                  onClick={() => handlers.onDayClick(day)}
                  onHover={() => handlers.onDayHover(day)}
                  value={day}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Month;
