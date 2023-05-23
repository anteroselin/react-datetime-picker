export interface DatetimePickerRef {
  value: () => string;
}

export interface DatetimePickerProps {
  initialDate?: Date;
  minDate?: Date | string;
  maxDate?: Date | string;
  showTime?: boolean;
  showTimezone?: boolean;
  format?: string;
  onChange: (date: Date) => void;
}
