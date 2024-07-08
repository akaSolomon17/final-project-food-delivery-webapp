import { useQuery } from "@tanstack/react-query"
import http from "../../utils/http"

export const getFoodCategories = () => http.get('foodCategories')

export const useGetFoodCategories = () => {
    return useQuery({
        queryKey: ["foodCategories"],
        queryFn: getFoodCategories
    })
}
