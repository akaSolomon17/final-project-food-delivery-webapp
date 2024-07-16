import { useEffect, useMemo } from "react";
import { useProductActions } from "../../zustand/productStore";
import { useGetFoodFiltered } from "../../apis/products/getFoodFiltered.api";

import ProductsList from "./ProductsList";
import Loading from "../Loading/Loading";

const AllProducts = () => {
  const { setDataFoodList } = useProductActions();
  const { data: fetchFilter, isLoading } = useGetFoodFiltered();

  const fetchFilterData = useMemo(() => fetchFilter?.data, [fetchFilter]);

  useEffect(() => {
    if (fetchFilterData) {
      setDataFoodList(fetchFilterData);
    }
  }, [fetchFilterData, setDataFoodList]);

  return (
    <div className="mb-20 flex flex-col items-center">
      {
        <>
          {isLoading ? (
            <div className="flex justify-center items-center w-[50rem] h-[35rem]">
              <Loading />
            </div>
          ) : (
            <ProductsList isLoading={isLoading} />
          )}
        </>
      }
    </div>
  );
};

export default AllProducts;
