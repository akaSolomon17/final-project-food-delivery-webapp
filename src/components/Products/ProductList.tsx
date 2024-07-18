import { useMemo } from "react";
import { useGetFoodFiltered } from "../../apis/products/getFoodFiltered.api";
import Loading from "../Loading/Loading";
import ProductItem from "../ProductItem/ProductItem";
import { Food } from "../../types/foods.type";
import EmptyProduct from "./EmptyProduct";
import "./ProductList.css";
const ProductList = () => {
  const { data: fetchFilter, isLoading } = useGetFoodFiltered();
  const fetchFilterData = useMemo(() => fetchFilter?.data, [fetchFilter]);

  if (isLoading) {
    return (
      <div className="product-container">
        <div className="flex justify-center items-center w-[50rem] h-[35rem]">
          <Loading />
        </div>
      </div>
    );
  }

  if (fetchFilterData.length === 0) {
    return (
      <div className="product-container">
        <EmptyProduct />
      </div>
    );
  }

  return (
    <div className="product-container">
      <div className="flex flex-rows gap-9 flex-wrap mt-[4rem] max-w-[83rem] bg-opacity-5">
        {fetchFilterData?.map((item: Food, index: number) => {
          return <ProductItem key={index} item={item} index={index} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
