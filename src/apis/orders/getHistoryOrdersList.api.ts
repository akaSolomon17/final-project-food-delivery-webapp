import http from "../../utils/http";
import { useQuery } from "@tanstack/react-query";

export const getHistoryOrdersList=() => http.get("/historyOrders");

export const useGetHistoryOrdersList = () => {
    const queryResult = useQuery({
        queryKey: ["historyOrders"],
        queryFn: () => getHistoryOrdersList(),
    });
    return queryResult;
}