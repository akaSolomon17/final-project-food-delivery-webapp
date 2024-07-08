import {useQuery} from "@tanstack/react-query"
import http from "../../utils/http"

const getFoodFiltered = (
    sort: string,
    order: string,
    priceNumber_gte: number, 
    priceNumber_lte: number, 
    categories: string[] | undefined, 
    avgRate: number
    ) => {
            let url = `http://localhost:3000/foodList?_sort=${sort || ""}&_order=${order || ""}&priceNumber_gte=${priceNumber_gte}&priceNumber_lte=${priceNumber_lte}&avgRate_gte=${avgRate}`;

            if (categories && categories.length > 0) {
                const categoryParams = categories.map(category => `category_like=${encodeURIComponent(category)}`).join('&');
                url += `&${categoryParams}`;
            }

            return http.get(url);
        }

export const useGetFoodFiltered = (
    sortBy: string,
    order: string,
    priceNumber_gte: number, 
    priceNumber_lte: number, 
    categories: string[] | undefined, 
    avgRate: number, 
    applyingFilters: boolean) => {
    return useQuery({
        queryKey: ["foodFiltered",sortBy, order, priceNumber_gte, priceNumber_lte, categories, avgRate],
        queryFn: () => getFoodFiltered(sortBy, order, priceNumber_gte, priceNumber_lte, categories, avgRate),
        enabled: applyingFilters
    })
}