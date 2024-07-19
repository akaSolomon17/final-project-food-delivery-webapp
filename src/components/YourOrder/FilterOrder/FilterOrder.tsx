import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { parseDate } from "@internationalized/date";
import { FormProvider, useForm } from "react-hook-form";
import { convertDateRange } from "../../../utils/convertDateRange";
import { IYourOrderDefaultValue } from "../../../types/order.type";
import { EDateRangeDefaultValue } from "../../../types/enums.type";
import { getCurrentDate } from "../../../utils/convertDateToMilisecond";
import { FilterDate } from "./FilterDate";
import { convertMilisecondDate } from "../../../utils/convertMilisecondDate";
import FilterStatus from "./FilterStatus";

const { START_DATE } = EDateRangeDefaultValue;

const FilterOrder = () => {
  const defaultStartDate = parseDate(START_DATE);
  const defaultEndDate = parseDate(getCurrentDate());

  const [searchParams, setSearchParams] = useSearchParams();
  const methods = useForm<IYourOrderDefaultValue>({
    defaultValues: {
      dateRange: { start: defaultStartDate, end: defaultEndDate },
      orderStatus: "",
    },
  });
  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const orderStatus = searchParams.get("orderStatus");

    if (startDate && endDate) {
      const start = convertMilisecondDate(Number(startDate));
      const end = convertMilisecondDate(Number(endDate));

      const parseDateStart = parseDate(start);
      const parseDateEnd = parseDate(end);

      setValue("dateRange", { start: parseDateStart, end: parseDateEnd });
    }

    if (orderStatus) {
      setValue("orderStatus", orderStatus);
    }
  }, [searchParams, setValue]);

  const handleSubmitFilterOrder = (data: IYourOrderDefaultValue) => {
    const orderStatus = data.orderStatus;
    const milisecondDate = convertDateRange(data.dateRange);
    const { startDateInMilliseconds, endDateInMilliseconds } = milisecondDate;

    orderStatus !== "All"
      ? searchParams.set("orderStatus", orderStatus)
      : searchParams.delete("orderStatus");

    searchParams.set("startDate", String(startDateInMilliseconds));
    searchParams.set("endDate", String(endDateInMilliseconds));
    searchParams.set("page", "1");

    setSearchParams(searchParams);
  };

  const handleResetFilterOrder = () => {
    reset();
    setSearchParams({});
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSubmitFilterOrder)}
          className="flex w-full justify-center"
        >
          <FilterStatus />
          <FilterDate />
          <div className="flex flex-col gap-2 ms-2">
            <Button type="submit" radius="sm" className="h-[30px]">
              Apply filter
            </Button>
            <Button
              type="reset"
              radius="sm"
              className="h-[30px]"
              onClick={handleResetFilterOrder}
            >
              Reset
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default FilterOrder;
