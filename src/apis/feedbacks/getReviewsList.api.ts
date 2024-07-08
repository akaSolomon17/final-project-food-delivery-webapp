import {useQuery} from "@tanstack/react-query"
import http from "../../utils/http"


export const getReviewsList = () => http.get('userReview')

export const useGetReviewsList = ()=>{
    const {data: reviewsList, ...options} = useQuery({
        queryKey: ["reviewsList"],
        queryFn: getReviewsList,
    })
    return {reviewsList,...options}
}