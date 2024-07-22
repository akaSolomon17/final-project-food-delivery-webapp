import { Button, useDisclosure } from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";

import ModalAddProduct from "../components/ModalAddProduct/ModalAddProduct";
import TableManagements from "../components/ProductManagements/TableManagements";
import {
  useCurrentFood,
  useProductManagementsActions,
} from "../zustand/productManagements";

const ProductsManagement = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentFood = useCurrentFood();
  const { setCurrentFood } = useProductManagementsActions();
  const handleAddProduct = () => {
    setCurrentFood(null);
    onOpen();
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center h-[605px]">
      <ModalAddProduct
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        currentFood={currentFood}
      />
      <div className="flex items-center justify-between w-2/3 ">
        <h1 className="font-bold text-3xl my-10">Products Management</h1>
        <Button
          onPress={handleAddProduct}
          className="bg-black text-white"
          size="sm"
        >
          <IoMdAdd size={18} />
        </Button>
      </div>
      <TableManagements onOpenModal={onOpen} />
    </div>
  );
};

export default ProductsManagement;
