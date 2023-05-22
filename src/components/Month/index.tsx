import { FC } from "react";

import moment from "moment";
import _ from "lodash";

import Day from "components/Day";
import Header from "components/Header";

import { getDaysInMonth } from "utils";

import { DATE, DateFormat, NavigationAction } from "types/general.types";
import { MonthProps } from "types/month.types";

import "./month.scss";

const WEEK_DAYS: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"];

const Month: FC<MonthProps> = ({ helpers, handlers, value, date, setValue, minDate, maxDate }) => {
  return (
    <div className="date-picker-month-root">
      <Header
        date={value}
        setDate={setValue}
        nextDisabled={false}
        prevDisabled={false}
        onClickPrevious={() => handlers.onMonthNavigate(NavigationAction.Previous)}
        onClickNext={() => handlers.onMonthNavigate(NavigationAction.Next)}
      />
      <div className="month-week-days-container">
        {WEEK_DAYS.map((day) => (
          <span key={day} className="month-week-day">
            {day}
          </span>
        ))}
      </div>

      <div className="month-days-container">
        {_.chunk(getDaysInMonth(value), 7).map((week, index) => (
          <div key={index} className="month-week">
            {week.map((day) => {
              const isSelected = moment(date).isSame(day, DATE.DAY);
              const highlighted = helpers.isHover(day);

              return (
                <Day
                  key={moment(day).format(DateFormat.ISO8601)}
                  filled={isSelected}
                  outlined={!highlighted && moment().isSame(day, DATE.DAY)}
                  highlighted={highlighted}
                  isCurrentMonth={moment(day).isSame(value, DATE.MONTH)}
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
