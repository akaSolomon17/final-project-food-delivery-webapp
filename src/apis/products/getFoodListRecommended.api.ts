import {useQuery} from "@tanstack/react-query"
import http from "../../utils/http"

export const getFoodListRecommended = (category: string | null, id: string) => http.get(`foodList?category_like=${category}&id_ne=${id}`)

// GET Recommended food list and exclude the current food from list`
export const useGetFoodListRecommended = (category: string | null, id: string)=>{
    const {data: recommendedResult, ...options} = useQuery({
        queryKey: ["category", category],
        queryFn: () => getFoodListRecommended(category, id)
    })
    return {recommendedResult,...options}
}