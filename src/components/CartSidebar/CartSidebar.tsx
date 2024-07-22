/* eslint-disable react-hooks/exhaustive-deps */
import {
  useCart,
  useCartActions,
  useCartExpand,
  useIsExceedLimit,
  useQuantities,
} from "../../zustand/cartStore";
import { ICart } from "../../types/carts.type";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../utils/clickOutside";
import { useGetFoodByListId } from "../../apis/products/getFoodById.api";
import { randomDistanceTimeEstimate } from "../../utils/calcTimeEstimate";
import CartEmpty from "./CartEmpty";
import CartLayout from "./CartLayout";
import CartContent from "./CartContent";
import CartToggleOverlay from "./CartToggleOverlay";
import ModalNotification from "../ModalNotification.tsx/ModalNotification";

const CartSidebar = () => {
  const {
    setTotalPrice,
    setDiscountInfo,
    setCartExpand,
    setCartTimeArrival,
    setCartDistance,
  } = useCartActions();
  const cart = useCart();
  const isExceedLimit = useIsExceedLimit();
  const quantities = useQuantities();
  const cartExpand = useCartExpand();
  const cartSidebarRef = useRef<HTMLDivElement>(null);
  const { distanceRandom } = randomDistanceTimeEstimate(); // edit to hardcore value to demo (30 seconds)
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const { data: foodsId } = useGetFoodByListId(
    cart.map((item: ICart) => item.id),
  );
  const [isDistanceAndTimeSet, setIsDistanceAndTimeSet] =
    useState<boolean>(false);

  useEffect(() => {
    if (cart.length > 0 && !isDistanceAndTimeSet) {
      setCartDistance(distanceRandom);
      setCartTimeArrival(1);
      setIsDistanceAndTimeSet(true);
    } else if (cart.length === 0 && isDistanceAndTimeSet) {
      setCartDistance("");
      setCartTimeArrival(0);
      setIsDistanceAndTimeSet(false);
    }
  }, [cart.length]);

  // CALC TOTAL PRICE
  useEffect(() => {
    if (foodsId) {
      let total = 0;

      foodsId.forEach((item) => {
        total += item.priceNumber * (quantities[item.id] || 1);
      });

      setTotalPrice(total);
      const updatedDiscountInfo = { priceReduce: 0, totalPriceDiscount: total };
      setDiscountInfo(updatedDiscountInfo);
    }
  }, [quantities]);

  useEffect(() => {
    if (isExceedLimit) {
      onOpen();
    }
  }, [isExceedLimit]);

  useClickOutside(cartSidebarRef, () => {
    if (cartExpand) setCartExpand(!cartExpand);
  });

  return (
    <div>
      {cartExpand && <CartToggleOverlay />}
      <div className="z-999 absolute ">
        <ModalNotification
          title="Bạn đã vượt quá giới hạn của hoá đơn!"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          Tổng giá trị mỗi hoá đơn chỉ dưới 2.000.000 VNĐ. Vui lòng đặt thêm ở
          đơn hàng khác!
        </ModalNotification>
      </div>
      {cart.length > 0 ? (
        <CartLayout cartSidebarRef={cartSidebarRef}>
          <CartContent />
        </CartLayout>
      ) : (
        <CartEmpty cartSidebarRef={cartSidebarRef} />
      )}
    </div>
  );
};

export default CartSidebar;
