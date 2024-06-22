import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http"; 

// Get food by id
export const getFoodById = (id: string) => http.get(`foodList/${id}`)

export const useGetFoodById = (id: string) => {
    const { data: foodId, ...options } = useQuery({
        queryKey: ["foodId", id],
        queryFn: () => getFoodById(id)
    })
    return { foodId, ...options }
}

// Get multiple foods by ids
export const getFoodByIds = (ids: string[]) => {
    return Promise.all(ids.map(id => getFoodById(id).then(res => res.data)));
}

export const useGetFoodByIds = (ids: string[]) => {
    const queryResult = useQuery({
        queryKey: ["foodId", ids],
        queryFn: () => getFoodByIds(ids),
        enabled: ids.length > 0
    })

    return queryResult
}