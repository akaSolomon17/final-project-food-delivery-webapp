import http from "../../utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteProductById = (id: string) => http.delete(`/foodList/${id}`);

export const useDeleteProductById = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => {
            return deleteProductById(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["foodList"] });
        }
    })
}