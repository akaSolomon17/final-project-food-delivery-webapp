import { Food } from "../../types/foods.type";
import http from "../../utils/http";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const updateFoodById = async (id: string, foodUpdated: Food) => http.put<Food>(`/foodList/${id}`, foodUpdated);

export const useUpdateFoodById = () => {
    const queryClient = useQueryClient();

    // UPDATE Todo
    return useMutation({
        mutationFn: ({ id, foodUpdated }: { id: string, foodUpdated: Food }) => updateFoodById(id, foodUpdated),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['foodList'] })
    });
};