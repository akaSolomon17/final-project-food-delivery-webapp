import { Food } from "../../types/foods.type";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import http from "../../utils/http";

export const updateFoodById = async (id: string, foodUpdated: Food) =>
  http.put<Food>(`/foodList/${id}`, foodUpdated);

export const useUpdateFoodById = () => {
  const queryClient = useQueryClient();

  // UPDATE Todo
  return useMutation({
    mutationFn: ({ id, foodUpdated }: { id: string; foodUpdated: Food }) =>
      updateFoodById(id, foodUpdated),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["foodList"] }),
  });
};
