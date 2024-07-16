import {useQuery} from "@tanstack/react-query"
import http from "../../utils/http"


// Get all food list
export const getFoodList = () => http.get('foodList')

export const useGetFoodList = () => {
    return useQuery({
        queryKey: ["foodList"],
        queryFn: getFoodList,
        // enabled: foodList?.length > 0 
    })
}

// Get exclusive food list
export const getExclusiveFoodList = () => http.get('foodList?isExclusive=exclusive')

export const useGetExclusiveFoodList = ()=>{
    return useQuery({
        queryKey: ["exclusiveFoodList"],
        queryFn: getExclusiveFoodList,
    })
}

// Get search value
export const getSearch = (search: string | null) => http.get(`foodList?title_like=${search}`)

export const useGetSearch = (search: string | null)=>{
    return useQuery({
        queryKey: ["search",search],
        queryFn: () => getSearch(search),
    })
}