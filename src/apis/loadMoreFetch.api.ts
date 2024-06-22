import http from "../utils/http";
import { useQuery } from "@tanstack/react-query";

export const loadMoreFetch = async (route: string, pageActive:number, limitRecords: number, sort?: string, order?: string ) => {
    const res =  await http.get(`${route}?_page=${pageActive}&_limit=${limitRecords}&_sort=${sort || ""}&_order=${order || ""}`)

    const totalItems = res.headers['x-total-count'];
    const totalPages = Math.ceil(totalItems / limitRecords);

    return { data: res.data, totalPages };
};

export const useLoadMoreFetch = (route: string, pageActive:number, limitRecords: number, sort?: string, order?: string ) => {
    const { data, ...options } = useQuery({
        queryKey: [route, pageActive, limitRecords],
        queryFn: () => loadMoreFetch(route, pageActive, limitRecords, sort, order),
    });
    return { 
        data: data?.data, 
        totalPages: data?.totalPages , 
        ...options };
}