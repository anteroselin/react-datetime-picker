import moment from "moment";

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
