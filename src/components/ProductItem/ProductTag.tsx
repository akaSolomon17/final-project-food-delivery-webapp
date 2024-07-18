import { FC } from "react";
import { Chip } from "@nextui-org/react";
import { AiFillTags } from "react-icons/ai";
import { IProductTagProps } from "../../types/commons.type";

const ProductTag: FC<IProductTagProps> = ({ label }) => {
  let bgColor = "bg-gray-500";

  if (label === "Best Seller") {
    bgColor = "bg-slate-500";
  }

  return (
    <Chip className={`flex flex-row ${bgColor} text-white`}>
      <div className="flex items-center gap-2">
        <AiFillTags />
        <p>{label}</p>
      </div>
    </Chip>
  );
};

export default ProductTag;
