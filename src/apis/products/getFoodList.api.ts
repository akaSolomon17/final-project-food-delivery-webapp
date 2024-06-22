import {useQuery} from "@tanstack/react-query"
import http from "../../utils/http"


// Get all food list
export const getFoodList = () => http.get('foodList')

export const useGetFoodList = () => {
    const queryResult = useQuery({
        queryKey: ["foodList"],
        queryFn: () => getFoodList(),
        // enabled: foodList?.length > 0 
    })
    return queryResult
}
        

// Get exclusive food list
export const getExclusiveFoodList = () => http.get('foodList?isExclusive=true')

export const useGetExclusiveFoodList = ()=>{
    const {data: exclusiveFoodList, ...options} = useQuery({
        queryKey: ["exclusiveFoodList"],
        queryFn: () => getExclusiveFoodList(),
    })
    return {exclusiveFoodList,...options}
}

// Get search value
export const getSearch = (search: string | null) => http.get(`/foodList?title_like=${search}`)

export const useGetSearch = (search: string | null)=>{
    const {data: searchResult, ...options} = useQuery({
        queryKey: ["search",search],
        queryFn: () => getSearch(search),
    })
    return {searchResult,...options}
}