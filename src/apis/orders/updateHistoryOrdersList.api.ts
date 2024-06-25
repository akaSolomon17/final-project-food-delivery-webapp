import { IHistoryOrders } from "../../types/historyOrders.type";
import http from "../../utils/http";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const addHistoryOrders = async (newHistoryOrders: IHistoryOrders) => http.post(`/historyOrders`, newHistoryOrders);

export const useAddHistoryOrders = () => {
    const queryClient = useQueryClient();

    // ADD History Orders
    return useMutation({
        mutationFn: ({ newHistoryOrders }: { newHistoryOrders: IHistoryOrders }) => addHistoryOrders(newHistoryOrders),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['historyOrders'] });
        }
    });
};