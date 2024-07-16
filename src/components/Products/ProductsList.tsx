import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import React from "react";
import { Food } from "../../types/foods.type";
import { BsCartPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { AiFillTags } from "react-icons/ai";
import EmptyProduct from "./EmptyProduct";
import { useDataFoodList } from "../../zustand/productStore";

const ProductsList: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const navigate = useNavigate();
  const dataFoodList = useDataFoodList();

  if (dataFoodList.length === 0) {
    return <EmptyProduct />;
  }

  return (
    <div>
      <div className="flex flex-rows gap-9 flex-wrap mt-[4rem] max-w-[83rem] bg-opacity-5">
        {isLoading ? (
          <div className="flex justify-center items-center w-[50rem] h-[35rem]">
            <Loading />
          </div>
        ) : (
          <>
            {dataFoodList?.map((item: Food, index: number) => (
              <Card
                shadow="sm"
                className=" max-h-[28rem] max-w-[19rem] items-start"
                key={index}
                isPressable
                onPressEnd={() => {
                  navigate(`/product-details/${item.id}`);
                }}
              >
                <CardBody className="overflow-visible p-0 max-h-[420px] h-[15rem] min-w-[304px] ">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    className="w-full object-cover h-[15rem] select-none"
                    alt={item.title}
                    src={item.img as string}
                  />
                </CardBody>
                <CardFooter className="flex flex-col min-h-[250px] max-w-[30rem] items-start ">
                  <div className="flex flex-col text-small self-start text-left max-w-[25rem] h-[100px] max-h-[100px] mb-[1rem]">
                    <b>{item.title}</b>
                    <b className="font-normal max-w-[20rem]">
                      {item.description}
                    </b>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      {item.category === "Box Yummy" && (
                        <Chip className="flex flex-row bg-gray-500 text-white self-end">
                          <div className="flex items-center gap-2">
                            <AiFillTags />
                            <p className="">Recommended</p>
                          </div>
                        </Chip>
                      )}
                      {item.isExclusive === "exclusive" && (
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
