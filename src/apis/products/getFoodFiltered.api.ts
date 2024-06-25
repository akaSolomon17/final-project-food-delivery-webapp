import {useQuery} from "@tanstack/react-query"
import http from "../../utils/http"

const getFoodFiltered = (
    priceNumber_gte: number, 
    priceNumber_lte: number, 
    categories: string[], 
    avgRate: number
    ) => {
            const categoryArray = Array.isArray(categories) ? categories : [categories];
            const categoryParams = categoryArray.map(category => `${category}`).join('&');
            const url = `http://localhost:3000/foodList?priceNumber_gte=${priceNumber_gte}&priceNumber_lte=${priceNumber_lte}&category_like=${categoryParams}&avgRate_gte=${avgRate}`
            return http.get(url)
        }

export const useGetFoodFiltered = ( 
    priceNumber_gte: number, 
    priceNumber_lte: number, 
    categories: string[], 
    avgRate: number, applyingFilters: boolean) => {
    const {data: foodFiltered, ...options} = useQuery({
        queryKey: ["foodFiltered", priceNumber_gte, priceNumber_lte, categories, avgRate],
        queryFn: () => getFoodFiltered(priceNumber_gte, priceNumber_lte, categories, avgRate),
        enabled: applyingFilters
    })
    return {foodFiltered,...options}
}