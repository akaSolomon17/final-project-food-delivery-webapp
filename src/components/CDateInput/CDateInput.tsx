import { DateRangePicker, CalendarDate } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useCartActions } from "../../zustand/cartStore";
import { EDateRangeDefaultValue } from "../../types/enums.type";
import { useEffect } from "react";

const { START_DATE } = EDateRangeDefaultValue
export const CDateRangePicker = () => {
    const { setStartDate, setEndDate } = useCartActions()

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months được đánh số từ 0 -> 11
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const handleOnChangeRangeDate = (startDate: CalendarDate, endDate: CalendarDate) => {
        const { day, month, year } = startDate
        const { day: endDay, month: endMonth, year: endYear } = endDate

        const startDateDestructured = new Date(year, month - 1, day + 1);
        const endDateDestructured = new Date(endYear, endMonth - 1, endDay + 1);

        const startDateInMiliseconds = startDateDestructured.getTime();
        const endDateInMiliseconds = endDateDestructured.getTime();

        setStartDate(startDateInMiliseconds)
        setEndDate(endDateInMiliseconds)
    }

    const defaultStartDate = parseDate(START_DATE);
    const defaultEndDate = parseDate(getCurrentDate());

    useEffect(() => {
        handleOnChangeRangeDate(defaultStartDate, defaultEndDate);
    }, []);

    return (
        <div className="flex w-1/2 flex-col gap-4 items-center justify-center">
            <div className="flex w-2/3 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <DateRangePicker
                    label="Order Date filter"
                    defaultValue={
                        {
                            start: parseDate(START_DATE),
                            end: parseDate(getCurrentDate())
                        }
                    }
                    className="max-w-xs"
                    onChange={({ start, end }) => handleOnChangeRangeDate(start, end)}
                    maxValue={parseDate(getCurrentDate())}
                />
            </div>
        </div>
    );
}
