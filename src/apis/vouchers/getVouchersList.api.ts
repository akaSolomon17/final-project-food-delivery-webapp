import http from "../../utils/http";
import { useQuery } from "@tanstack/react-query";

// GET ALL VOUCHERS API
export const getVouchersList = () => http.get('vouchers')

export const useGetVouchersList = () => {
    return useQuery({
        queryKey: ['vouchers'],
        queryFn: getVouchersList
    })
}


// SEARCH VOUCHERS API
export const getVouchersListByCode = (discountCode: string | null = "") => http.get(`vouchers?code_like=${discountCode}`)

export const useGetVouchersListByCode = (discountCode: string | null) => {
    return useQuery({
        queryKey: ['vouchersSearch', discountCode],
        queryFn: () => getVouchersListByCode(discountCode)
    })
}