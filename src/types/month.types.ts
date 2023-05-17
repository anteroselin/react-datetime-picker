import { NavigationAction } from "./general.types";

export interface MonthProps {
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
    onMonthNavigate: (action: NavigationAction) => void;
  };
}
