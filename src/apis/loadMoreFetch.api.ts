import http from "../utils/http";
import { useQuery } from "@tanstack/react-query";

// http://localhost:3000/foodList?_page=2&_limit=4&_sort=id&_order=asc&priceNumber_gte=45000&priceNumber_lte=65000&category_like=ramen&category_like=kimbap&category_like=gogi&avgRate_gte=2
export const loadMoreFetch = async (
    route: string, 
    pageActive:number, 
    limitRecords: number, 
    isUsingFiltered: boolean,
    sort?: string, 
    order?: string,
    priceNumber_gte?: number,
    priceNumber_lte?: number,
    categories?: string[],
    avgRate?: number ) => {

    // URL API
    let urlApiFilteredSorted = `${route}?_page=${pageActive}&_limit=${limitRecords}&_sort=${sort || ""}&_order=${order || ""}&priceNumber_gte=${priceNumber_gte}&priceNumber_lte=${priceNumber_lte}&avgRate_gte=${avgRate}`
    const urlApiSorted = `${route}?_page=${pageActive}&_limit=${limitRecords}&_sort=${sort || ""}&_order=${order || ""}`
    
    // EDIT URL FOR MANY CATEGORIES
    if (categories) {
        categories.forEach(category => {
            urlApiFilteredSorted += `&category_like=${category}`;
        });
    }

    // FETCH DATA
    const res = isUsingFiltered ? await http.get(urlApiFilteredSorted) : await http.get(urlApiSorted)

    const totalItems = res.headers['x-total-count'];
    const totalPages = Math.ceil(totalItems / limitRecords);

    return { data: res.data, totalPages };
};

export const useLoadMoreFetch = (
    route: string, 
    pageActive:number, 
    limitRecords: number, 
    isUsingFiltered: boolean,
    sort?: string, 
    order?: string,
    priceNumber_gte?: number,
    priceNumber_lte?: number,
    categories?: string[],
    avgRate?: number) => {    

    const { data, ...options } = useQuery({
        queryKey: [route, pageActive, limitRecords],
        queryFn: () => loadMoreFetch(route, pageActive, limitRecords, isUsingFiltered, sort, order, priceNumber_gte, priceNumber_lte, categories, avgRate),
    });

    return { 
        data: data?.data, 
        totalPages: data?.totalPages , 
        ...options };
}
