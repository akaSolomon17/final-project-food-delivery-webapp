import { Avatar, Badge } from "@nextui-org/react";
import { FoodCategory } from "../../types/foods.type";
import { useGetFoodCategories } from "../../apis/products/getFoodCategories.api";

const MainService = () => {
  const { data: foodCategories } = useGetFoodCategories();

  return (
    <div>
      <h3 className="text-center text-lg font-normal mt-20">Main Service</h3>
      <h3 className="text-center text-2xl font-semibold mt-3">
        Our Exclusive Cakes
      </h3>
      <div className="flex gap-11 items-center justify-center mt-[2.5rem]">
        {foodCategories?.data.length &&
          foodCategories?.data.map((category: FoodCategory, index: number) => (
            <div key={index} className="flex flex-col items-center size-28">
              <Badge color="danger" placement="top-right">
                <Avatar isBordered size="lg" radius="md" src={category.img} />
              </Badge>
              <span className="font-sans font-medium mt-3">
                {category.name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MainService;
