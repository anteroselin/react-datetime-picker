import moment from "moment";

type Falsy = false | null | undefined | 0 | "";

export const parseOptionalDate = (date: Date | string | Falsy, defaultValue: Date) => {
  if (date) {
    const parsed = moment(date);

    if (parsed.isValid()) {
      return parsed.toDate();
    }
  }

  return defaultValue;
};

export const getDaysInMonth = (date: Date) => {
  const startWeek = moment(date).startOf("month").startOf("week");
  const endWeek = moment(date).endOf("month").endOf("week");
  const days = [];

  let curr = startWeek;
  while (curr.isBefore(endWeek)) {
    days.push(curr.toDate());
    curr = curr.add(1, "day");
  }
  return days;
};

export const displayDate = (
  date: Date | null | undefined,
  time: string | undefined,
  showTime: boolean,
  isTimezone: boolean,
  timezone: string,
  format?: string
) => {
  const dateStr = moment(date).format("YYYY-MM-DD");
  const dateTimeStr = `${dateStr}T${time}`;
  const dateTime = showTime ? moment.tz(dateTimeStr, timezone) : moment(dateTimeStr);
  const dateFormat = format ?? `YYYY-MM-DD${showTime ? ` HH:mm ${isTimezone ? "(UTCZ)" : ""}` : ""}`;

  return dateTime.format(dateFormat);
};
