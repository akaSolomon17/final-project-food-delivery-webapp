import { Food } from "../../types/foods.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "../../utils/http";

export const addProduct = (product: Food) => http.post("/foodList", product);

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Food) => {
      return addProduct(body);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["foodList"] }),
  });
};
