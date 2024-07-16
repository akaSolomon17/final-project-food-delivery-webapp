import { useSearchParams } from "react-router-dom";
import { EDateRangeDefaultValue, EOrderStatus } from "../../types/enums.type";
import http from "../../utils/http";
import { useQuery } from "@tanstack/react-query";
import { convertToMilliseconds, getCurrentDate } from "../../utils/convertDateToMilisecond";
import { parseDate } from "@internationalized/date";

export const getHistoryOrdersList=() => http.get("historyOrders");

export const useGetHistoryOrdersList = () => {
    return useQuery({
        queryKey: ["historyOrders"],
        queryFn: getHistoryOrdersList,
    });
}

// SORT BY DATE
export const getHistoryOrdersByDate = (
    startDate: number, 
    endDate: number, 
    status: EOrderStatus
) => 
    http.get(`historyOrders?orderDate_gte=${startDate}&orderDate_lte=${endDate}&status_like=${status}`)

export const useGetHistoryOrdersByDate = () => {
    const [searchParam] = useSearchParams();

    const defaultStartDate = parseDate(EDateRangeDefaultValue.START_DATE);
    const defaultEndDate = parseDate(getCurrentDate());

    const startDate = Number(searchParam.get("startDate")) || convertToMilliseconds(defaultStartDate);
    const endDate = Number(searchParam.get("endDate")) || convertToMilliseconds(defaultEndDate);
    const status = searchParam.get("orderStatus") as EOrderStatus || "";
    
    return useQuery({
        queryKey: ['historyOrders', startDate, endDate, status],
        queryFn: () => getHistoryOrdersByDate(startDate, endDate, status)
    })
}