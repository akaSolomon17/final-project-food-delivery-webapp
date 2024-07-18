import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import { BsCartPlus } from "react-icons/bs";
import { IProductItemProps } from "../../types/foods.type";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ProductTag from "./ProductTag";
import "./ProductItem.css";

const ProductItem: FC<IProductItemProps> = ({ item, index }) => {
  const navigate = useNavigate();

  return (
    <div className="">
      <Card
        shadow="sm"
        className=" max-h-[28rem] max-w-[19rem] items-start"
        key={index}
        isPressable
        onPressEnd={() => {
          navigate(`/product-details/${item.id}`);
        }}
      >
        <CardBody className="card-body">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            className="w-full object-cover h-[15rem] select-none"
            alt={item.title}
            src={item.img as string}
          />
        </CardBody>
        <CardFooter className="card-footer">
          <div className="footer-info">
            <b>{item.title}</b>
            <b className="font-normal max-w-[20rem]">{item.description}</b>
          </div>
          <div className="flex justify-between items-center w-full">
            <div>
              {item.category === "Box Yummy" && (
                <ProductTag label="Best Seller" />
              )}
              {item.isExclusive === "exclusive" && (
                <ProductTag label="Recommended" />
              )}
            </div>
            <p className="text-default-700 text-right w-full">{item.price}₫</p>
          </div>
          <Chip className="bg-black text-white self-end mt-[0.5rem]">
            <BsCartPlus className="size-4" />
          </Chip>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductItem;
