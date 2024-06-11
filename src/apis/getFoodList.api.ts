import {useQuery} from "@tanstack/react-query"
import http from "../utils/http"

export const getFoodList = () => http.get('foodList?_start=0&_limit=4')

// Get all Food

export const useGetFoodList = ()=>{
    const {data: foodList, ...options} = useQuery({
        queryKey: ["foodList"],
        queryFn: () => getFoodList(),
    })
    return {foodList,...options}
}