import {useQuery} from "@tanstack/react-query"
import http from "../../utils/http"

export const getBannerList = () => http.get('bannerList')

// Get all Banner
export const useGetBannerList = ()=>{
    const {data: bannerList, ...options} = useQuery({
        queryKey: ["bannerList"],
        queryFn: getBannerList,
    })
    return {bannerList,...options}
}