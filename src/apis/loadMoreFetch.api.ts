import { EFilterSort } from "../types/enums.type";
import http from "../utils/http";
import { useQuery } from "@tanstack/react-query";
import { usePage } from "../zustand/productStore";

interface ILoadMoreFetch {
  route: EFilterSort;
  pageActive: EFilterSort;
  limitRecords: EFilterSort;
  sort?: string;
  order?: string;
}

const loadMoreFetch = async ({
  route,
  pageActive,
  limitRecords,
}: ILoadMoreFetch) => {
  const urlApiSorted = `${route}?_page=${pageActive}&_limit=${limitRecords}`;

  // FETCH DATA
  const res = await http.get(urlApiSorted);

  const totalItems = res.headers["x-total-count"];
  const totalPages = Math.ceil(totalItems / Number(limitRecords));

  return { data: res.data, totalPages };
};
const { COMMENT_LIMIT, USER_REVIEW } = EFilterSort;
export const useLoadMoreFetch = () => {
  const page = usePage();

  const { data, ...options } = useQuery({
    queryKey: ["userReview", USER_REVIEW, page, COMMENT_LIMIT],
    queryFn: () =>
      loadMoreFetch({
        route: USER_REVIEW,
        pageActive: page,
        limitRecords: COMMENT_LIMIT,
      }),
  });

  return {
    data: data?.data,
    totalPages: data?.totalPages,
    ...options,
  };
};
