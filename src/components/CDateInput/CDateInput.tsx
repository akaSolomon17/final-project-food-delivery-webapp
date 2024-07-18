import { parseDate } from "@internationalized/date";
import { getCurrentDate } from "../../utils/convertDateToMilisecond";
import DateRangePickerValidation from "../DateRangePickerValidation/DateRangePickerValidation";

export const CDateRangePicker = () => {
  return (
    <div className="flex w-1/4 flex-col gap-4 items-center justify-center">
      <div className="flex justify-center items-center w-2/3 md:flex-nowrap mb-6 md:mb-0 gap-4">
        <DateRangePickerValidation
          name="dateRange"
          label="Order date"
          className="max-w-xs"
          maxValue={parseDate(getCurrentDate())}
        />
      </div>
    </div>
  );
};
