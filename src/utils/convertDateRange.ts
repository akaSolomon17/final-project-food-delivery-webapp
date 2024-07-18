import { DateValue, RangeValue } from "@nextui-org/react";

export const convertDateRange = (dateRange: RangeValue<DateValue>) => {
  const startDay = dateRange.start.day;
  const startMonth = dateRange.start.month;
  const startYear = dateRange.start.year;

  const endDay = dateRange.end.day;
  const endMonth = dateRange.end.month;
  const endYear = dateRange.end.year;

  const startDate = new Date(startYear, startMonth - 1, startDay + 1);
  const endDate = new Date(endYear, endMonth - 1, endDay + 1);

  const startDateInMilliseconds = startDate.getTime();
  const endDateInMilliseconds = endDate.getTime();

  return { startDateInMilliseconds, endDateInMilliseconds };
};
