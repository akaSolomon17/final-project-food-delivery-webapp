
import { EOrderStatus } from "../../types/enums.type";
import http from "../../utils/http";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const updateHistoryOrderStatus = async (id: string, status: EOrderStatus) => http.patch(`historyOrders/${id}`, {"status": status});

export const useUpdateHistoryOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, status }: { id: string, status: EOrderStatus }) => updateHistoryOrderStatus(id, status),

        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['historyOrders'] })
    });
};