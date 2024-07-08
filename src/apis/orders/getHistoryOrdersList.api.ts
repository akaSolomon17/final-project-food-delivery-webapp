import http from "../../utils/http";
import { useQuery } from "@tanstack/react-query";

export const getHistoryOrdersList=() => http.get("historyOrders");

export const useGetHistoryOrdersList = () => {
    return useQuery({
        queryKey: ["historyOrders"],
        queryFn: getHistoryOrdersList,
    });
}

// SORT BY DATE
export const getHistoryOrdersByDate = (startDate: number, endDate: number) => http.get(`historyOrders?orderDate_gte=${startDate}&orderDate_lte=${endDate}`)

export const useGetHistoryOrdersByDate = (startDate: number, endDate: number) => {
    return useQuery({
        queryKey: ['historyOrders', startDate, endDate],
        queryFn: () => getHistoryOrdersByDate(startDate, endDate)
    })
}