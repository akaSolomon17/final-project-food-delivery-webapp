import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { EFilterSort } from "../../types/enums.type";
import { FoodFilterProps } from "../../types/filters.type";
import http from "../../utils/http";

const {
  NEWEST,
  OLDEST,
  RATING_UP,
  DESC,
  ACS,
  ID,
  AVG_RATE,
  PRICE_MIN,
  PRICE_MAX,
} = EFilterSort;

const getFoodFiltered = ({
  sort,
  order,
  priceMin,
  priceMax,
  categories,
  rating,
}: FoodFilterProps) => {
  let url = `http://localhost:3000/foodList?_sort=${sort || ""}&_order=${
    order || ""
  }&priceNumber_gte=${priceMin}&priceNumber_lte=${priceMax}&avgRate_gte=${rating}`;

  if (categories && categories.length > 0) {
    const categoryParams = categories
      .map((category) => `category_like=${encodeURIComponent(category)}`)
      .join("&");
    url += `&${categoryParams}`;
  }

  return http.get(url);
};

export const useGetFoodFiltered = () => {
  const [searchParams] = useSearchParams();
  const priceMin = searchParams.get("priceMin") || PRICE_MIN;
  const priceMax = searchParams.get("priceMax") || PRICE_MAX;
  const categories = searchParams.get("categories")?.split(",");
  const rating = searchParams.get("rating");
  const sortBy = searchParams.get("sortBy") || NEWEST;
  const sort = String(sortBy === NEWEST || sortBy === OLDEST ? ID : AVG_RATE);
  const order = String(sortBy === NEWEST || sortBy === RATING_UP ? DESC : ACS);

  return useQuery({
    queryKey: [
      "foodFiltered",
      sortBy,
      order,
      priceMin,
      priceMax,
      categories,
      rating,
    ],
    queryFn: () =>
      getFoodFiltered({
        sort,
        order,
        priceMin: Number(priceMin),
        priceMax: Number(priceMax),
        categories,
        rating: Number(rating),
      }),
  });
};
