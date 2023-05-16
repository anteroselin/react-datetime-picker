import { FC } from "react";

import "./day.scss";
import classNames from "classnames";
import moment from "moment";

interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
  isCurrentMonth?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: Date;
}

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
        data-testid={moment(value).format("YYYY-MM-DD")}
      >
        <span
          className={classNames("day-text", {
            contrast: !disabled && filled,
            invisible: isCurrentMonth,
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
