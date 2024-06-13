import { useQuery } from "@tanstack/react-query";
import http from "../utils/http"; 

export const getFoodById = (id: string) => http.get(`foodList/${id}`)

export const useGetFoodById = (id: string) => {
    const { data: foodId, ...options } = useQuery({
        queryKey: ["foodId", id],
        queryFn: () => getFoodById(id)
    })
    return { foodId, ...options }
}