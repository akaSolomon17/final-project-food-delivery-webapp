import { useGetFoodByListId } from "../../../apis/products/getFoodById.api";
import { ICart } from "../../../types/carts.type";
import { Food } from "../../../types/foods.type";
import { useCart } from "../../../zustand/cartStore";
import CartItem from "../../CartSidebar/CartItem";
import CCheckoutLayout from "../../CCheckout/CCheckoutLayout";
import OrderInfoFooter from "./OrderInfoFooter";

const OrderInfo = () => {
  const cart = useCart();
  const { data: foodByListId } = useGetFoodByListId(
    cart.map((item: ICart) => item.id),
  );

  return (
    <CCheckoutLayout header="Tóm tắt đơn hàng" footer={<OrderInfoFooter />}>
      {foodByListId?.length &&
        foodByListId.map((item: Food, index: number) => (
          <div className="pt-4 px-4" key={index}>
            <CartItem item={item} />
          </div>
        ))}
    </CCheckoutLayout>
  );
};

export default OrderInfo;
