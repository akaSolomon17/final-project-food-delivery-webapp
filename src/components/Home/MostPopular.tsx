import { useGetExclusiveFoodList } from "../../apis/products/getFoodList.api";
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import { Foods } from "../../types/foods.type";
import { useNavigate } from "react-router-dom";

const MostPopular = () => {
  const { data: exclusiveFoodList } = useGetExclusiveFoodList();

  const navigate = useNavigate();

  return (
    <div>
      <h3 className="text-center text-lg font-normal">Most Popular</h3>
      <h3 className="text-center text-2xl font-semibold mt-3">
        Our Exclusive Kimbap
      </h3>
      <div className="flex flex-rows justify-center mt-[4rem]">
        {exclusiveFoodList?.data.length &&
          exclusiveFoodList?.data.map((item: Foods, index: number) => (
            <Card
              shadow="sm"
              className="mx-[30px] max-h-[750px]"
              key={index}
              isPressable
              onPress={() => navigate(`/product-details/${item.id}`)}
            >
              <CardBody className="overflow-visible p-0 cardbody h-[420px] max-h-[420px]">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[400px] select-none"
                  src={item.img as string}
                />
              </CardBody>
              <CardFooter className="flex flex-col max-w-[30rem] items-start p-3">
                <div className="text-small flex  flex-col self-start text-left max-w-[25rem] h-[80px] max-h-[100px]">
                  <b>{item.title}</b>
                  <b className="font-normal max-w-[20rem]">
                    {item.description}
                  </b>
                </div>
                <p className="border-black text-default-700 text-right w-full">
                  {item.price}₫
                </p>
                <Chip className="bg-black text-white self-end mt-[0.5rem]">
                  Order Now
                </Chip>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default MostPopular;
