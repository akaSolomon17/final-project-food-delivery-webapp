import http from "../../utils/http";
import { useQuery } from "@tanstack/react-query";

export const getVouchersList = () => http.get('vouchers')

export const useGetVouchersList = () => {
    return useQuery({
        queryKey: ['vouchers'],
        queryFn: getVouchersList
    })
}