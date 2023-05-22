import { FC } from "react";

import moment from "moment";
import classNames from "classnames";

import { DateFormat } from "types/general.types";
import { DayProps } from "types/day.types";

import "./day.scss";

const Day: FC<DayProps> = ({ filled, outlined, disabled, highlighted, isCurrentMonth, onClick, onHover, value }) => {
  return (
    <div
      className={classNames("date-time-day-container", {
        highlighted: !disabled && isCurrentMonth && highlighted,
        outlined: !disabled && isCurrentMonth && outlined,
        filled: isCurrentMonth && filled,
      })}
      onClick={onClick}
      onMouseOver={onHover}
    >
      <button
        className="day-button"
        disabled={disabled || !isCurrentMonth}
        data-testid={moment(value).format(DateFormat.ISO8601)}
      >
        <span
          className={classNames("day-text", {
            contrast: !disabled && filled,
            invisible: !isCurrentMonth,
            disabled: disabled,
          })}
        >
          {moment(value).date()}
        </span>
      </button>
    </div>
  );
};

export default Day;
