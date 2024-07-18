import { useGetFoodByListId } from "../../apis/products/getFoodById.api";
import { ICart } from "../../types/carts.type";
import { Food } from "../../types/foods.type";
import { useCart } from "../../zustand/cartStore";
import CartItem from "./CartItem";

const CartContent = () => {
  const cart = useCart();
  const { data: foodsId } = useGetFoodByListId(
    cart.map((item: ICart) => item.id),
  );
  const rows = foodsId ?? [];

  return (
    <div className="overflow-scroll max-h-[700px]">
      {rows?.map((item: Food, index) => (
        <div className="pt-4 px-4" key={index}>
          <CartItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default CartContent;
