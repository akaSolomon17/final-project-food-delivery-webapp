import { ImSpoonKnife } from "react-icons/im";
import { Chip, Image } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useGetFoodById } from "../../../apis/products/getFoodById.api.ts";
import { AiFillTags } from "react-icons/ai";
import { foodInitialData } from "../../../../public/data/checkoutConstants.ts";
import Loading from "../../Loading/Loading.tsx";
import ProductContentButton from "./ProductContentButton.tsx";
import { useMemo } from "react";

const ProductContent = () => {
  const { productId } = useParams();
  const { foodId, isLoading: foodLoading } = useGetFoodById(productId || "0");

  const foodIdData = useMemo(() => {
    return foodId?.data || foodInitialData;
  }, [foodId]);

  if (foodLoading) {
    return (
      <div className="flex flex-col product-info gap-8 justify-start">
        <div className="flex flex-col product-info gap-8 h-[273px] justify-center items-center">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="dynamic-products flex gap-24 ms-80">
      <Image
        alt="product-img"
        src={foodIdData.img as string}
        shadow="sm"
        width={541}
        height={496}
        isLoading={foodLoading}
      />
      <div className="flex flex-col product-info gap-8 justify-start">
        <>
          <h1 className="font-extrabold font-sans text-3xl">
            {foodIdData.title}
          </h1>
          <p className="font-lato font-extrabold text-2xl ">
            {foodIdData.price + " VND"}
          </p>
          <div className="flex gap-2">
            {foodIdData.category === "Box Yummy" && (
              <div>
                <Chip className="flex flex-row bg-slate-500 text-white self-end mt-[5px]">
                  <div className="flex items-center gap-2">
                    <AiFillTags />
                    <p className="">Recommended</p>
                  </div>
                </Chip>
              </div>
            )}
            {foodIdData.isExclusive === "true" && (
              <div>
                <Chip className="flex flex-row bg-slate-500 text-white self-end mt-[5px]">
                  <div className="flex items-center gap-2">
                    <AiFillTags />
                    <p className="">Best seller</p>
                  </div>
                </Chip>
              </div>
            )}
          </div>
          <p className="font-lato font-normal text-lg max-w-[450px]">
            {foodIdData.description}
          </p>
          <p className="font-lato font-normal text-[#626264] text-lg flex items-center gap-2">
            <ImSpoonKnife />
            {foodIdData.category}
          </p>
        </>
        <ProductContentButton />
      </div>
    </div>
  );
};

export default ProductContent;
