import CSwiper from "../Swiper/CSwiper";
import { useNavigate, useParams } from "react-router-dom";
import { Food } from "../../types/foods.type";
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import { BsCartPlus } from "react-icons/bs";
import { AiFillTags } from "react-icons/ai";
import { useGetFoodListRecommended } from "../../apis/products/getFoodListRecommended.api";
import { useGetFoodById } from "../../apis/products/getFoodById.api";
import { foodInitialData } from "../../../public/data/checkoutConstants";
import { useMemo } from "react";

const AlsoLike = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { foodId } = useGetFoodById(productId || "0");
  const foodIdData = useMemo(() => {
    return foodId?.data || foodInitialData;
  }, [foodId]);

  const { recommendedResult } = useGetFoodListRecommended(
    foodIdData.category,
    foodIdData.id,
  );

  return (
    <div className="also-like max-h-[30rem] mb-20">
      <CSwiper
        slidePerView={4}
        className="w-[83rem] h-full flex flex-col"
        isPagination={false}
        isBanner={false}
        headerContent="You may also like"
      >
        {recommendedResult?.data?.length &&
          recommendedResult?.data.map((item: Food, index: number) => (
            <Card
              shadow="sm"
              className=" max-h-[28rem] max-w-[19rem] items-start"
              key={index}
              isPressable
              onPress={() => navigate(`/product-details/${item.id}`)}
            >
              <CardBody className="overflow-visible p-0 h-[15rem] max-h-[420px]">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[15rem]"
                  src={item.img as string}
                />
              </CardBody>
              <CardFooter className="flex flex-col max-w-[30rem] items-start ">
                <div className="text-small flex  flex-col self-start text-left max-w-[25rem] h-[80px] max-h-[100px] mb-[1rem]">
                  <p>{item.title}</p>
                  <p className="font-normal max-w-[20rem]">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <div>
                    {item.category === "Box Yummy" && (
                      <Chip className="flex flex-row bg-gray-500 text-white self-end ">
                        <div className="flex items-center gap-2">
                          <AiFillTags />
                          <p className="">Recommended</p>
                        </div>
                      </Chip>
                    )}
                    {item.isExclusive === "true" && (
                      <Chip className="flex flex-row bg-slate-500 text-white self-end mt-[5px]">
                        <div className="flex items-center gap-2">
                          <AiFillTags />
                          <p className="">Best seller</p>
                        </div>
                      </Chip>
                    )}
                  </div>
                  <p className="text-default-700 text-right w-full">
                    {item.price}₫
                  </p>
                </div>
                <Chip className="bg-black text-white self-end mt-[0.5rem]">
                  <BsCartPlus className="size-4" />
                </Chip>
              </CardFooter>
            </Card>
          ))}
      </CSwiper>
    </div>
  );
};

export default AlsoLike;
