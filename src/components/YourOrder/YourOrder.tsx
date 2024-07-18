import { CDateRangePicker } from "../CDateInput/CDateInput";
import { useOrderDetail } from "../../zustand/productStore";
import { Button, useDisclosure } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { FormProvider, useForm } from "react-hook-form";
import { IYourOrderDefaultValue } from "../../types/order.type";
import { useSearchParams } from "react-router-dom";
import { convertDateRange } from "../../utils/convertDateRange";
import { getCurrentDate } from "../../utils/convertDateToMilisecond";
import { EDateRangeDefaultValue } from "../../types/enums.type";
import { useEffect } from "react";
import { convertMilisecondDate } from "../../utils/convertMilisecondDate";
import ModalOrderDetails from "../ModalOrderDetails/ModalOrderDetails";
import FilterOrder from "./FilterOrder";
import TableOrder from "./TableOrder";
import "./YourOrder.css";

const { START_DATE } = EDateRangeDefaultValue;
const YourOrder = () => {
  const defaultStartDate = parseDate(START_DATE);
  const defaultEndDate = parseDate(getCurrentDate());
  const orderDetail = useOrderDetail();
  const { isOpen, onOpenChange } = useDisclosure();
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

    setSearchParams(searchParams);
  };

  const handleResetFilterOrder = () => {
    reset();
    setSearchParams({});
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl my-10">Your Orders</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSubmitFilterOrder)}
          className="flex w-full justify-center"
        >
          <CDateRangePicker />
          <FilterOrder />
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
      <ModalOrderDetails
        isOpen={isOpen}
        orderDetail={orderDetail}
        onOpenChange={onOpenChange}
      />
      <TableOrder onOpenChange={onOpenChange} />
    </div>
  );
};

export default YourOrder;
