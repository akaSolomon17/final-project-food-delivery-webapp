import { Food } from "../../types/foods.type";
import http from "../../utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const addProduct =  (product: Food) => http.post("/foodList", product);

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: Food) => {
            return addProduct(body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["foodList"] });
        }
    })
}