import { useState, useEffect } from "react";
import { DateRangePicker, CalendarDate, Button } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { EDateRangeDefaultValue } from "../../types/enums.type";
import { useSearchParams } from "react-router-dom";
import { getCurrentDate } from "../../utils/convertDateToMilisecond";

const { START_DATE } = EDateRangeDefaultValue;

export const CDateRangePicker = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultStartDate = parseDate(START_DATE);
  const defaultEndDate = parseDate(getCurrentDate());

  const [dateRange, setDateRange] = useState({
    start: defaultStartDate,
    end: defaultEndDate,
  });

  const handleOnChangeRangeDate = (
    startDate: CalendarDate,
    endDate: CalendarDate,
  ) => {
    const { day, month, year } = startDate;
    const { day: endDay, month: endMonth, year: endYear } = endDate;

    const startDateDestructured = new Date(year, month - 1, day + 1);
    const endDateDestructured = new Date(endYear, endMonth - 1, endDay + 1);

    const startDateInMilliseconds = startDateDestructured.getTime();
    const endDateInMilliseconds = endDateDestructured.getTime();

    searchParams.set("startDate", String(startDateInMilliseconds));
    searchParams.set("endDate", String(endDateInMilliseconds));
    setSearchParams(searchParams);
  };

  useEffect(() => {
    handleOnChangeRangeDate(dateRange.start, dateRange.end);
  }, [dateRange]);

  const handleClickReset = () => {
    const newStartDate = parseDate(START_DATE);
    const newEndDate = parseDate(getCurrentDate());

    setDateRange({ start: newStartDate, end: newEndDate });

    const startDateDestructured = new Date(
      newStartDate.year,
      newStartDate.month - 1,
      newStartDate.day + 1,
    );
    const endDateDestructured = new Date(
      newEndDate.year,
      newEndDate.month - 1,
      newEndDate.day + 1,
    );

    const startDateInMilliseconds = startDateDestructured.getTime();
    const endDateInMilliseconds = endDateDestructured.getTime();

    searchParams.set("startDate", String(startDateInMilliseconds));
    searchParams.set("endDate", String(endDateInMilliseconds));
    setSearchParams(searchParams);
  };

  return (
    <div className="flex w-1/4 flex-col gap-4 items-center justify-center">
      <div className="flex justify-center items-center w-2/3 md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Button radius="sm" className="h-[30px]" onClick={handleClickReset}>
          Reset date
        </Button>
        <DateRangePicker
          label="Order date"
          value={dateRange}
          defaultValue={{ start: dateRange.start, end: dateRange.end }}
          className="max-w-xs"
          onChange={({ start, end }) => setDateRange({ start, end })}
          maxValue={parseDate(getCurrentDate())}
        />
      </div>
    </div>
  );
};
