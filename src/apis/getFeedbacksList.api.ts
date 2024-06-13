import {useQuery} from "@tanstack/react-query"
import http from "../utils/http"

export const getFeedbacksApprovedList = () => http.get('userReview?isFeedbackApproved=true')

// Get all Banner
export const useGetFeedbacksApprovedList = ()=>{
    const {data: feedbacksApprovedList, ...options} = useQuery({
        queryKey: ["feedbacksApprovedList"],
        queryFn: () => getFeedbacksApprovedList(),
    })
    return {feedbacksApprovedList,...options}
}