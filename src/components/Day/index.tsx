import { FC } from "react";

import "./day.scss";
import classNames from "classnames";

interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
  isCurrentMonth?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
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
      <button className="day-button" disabled={disabled || !isCurrentMonth}>
        <span
          className={classNames("day-text", {
            contrast: !disabled && filled,
            invisible: isCurrentMonth,
            disabled: disabled,
          })}
        >
          {value}
        </span>
      </button>
    </div>
  );
};

export default Day;
