/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import CartContent from "./CartContent";
import {
  useCart,
  useCartActions,
  useCartDistance,
  useCartExpand,
  useCartTimeArrival,
  useQuantities,
  useTotalPrice,
} from "../../zustand/cartStore";
import { useGetFoodByListId } from "../../apis/products/getFoodById.api";
import { ICart } from "../../types/carts.type";
import { formatVnCurrency } from "../../utils/formatCurrency";
import { useClickOutside } from "../../utils/clickOutside";
import { randomDistanceTimeEstimate } from "../../utils/calcTimeEstimate";
import { useNavigate } from "react-router-dom";
import CartEmpty from "./CartEmpty";
import Loading from "../Loading/Loading";
import ModalNotification from "../ModalNotification.tsx/ModalNotification";
import { useDisclosure } from "@nextui-org/react";

const CartSidebar = () => {
  const {
    setTotalPrice,
    setDiscountInfo,
    setCartExpand,
    setCartTimeArrival,
    setCartDistance,
  } = useCartActions();
  const cart = useCart();
  const navigate = useNavigate();
  const cartDistance = useCartDistance();
  const cartTimeArrival = useCartTimeArrival();
  const quantities = useQuantities();
  const cartExpand = useCartExpand();
  const totalPrice = useTotalPrice();
  const cartSidebarRef = useRef<HTMLDivElement>(null);
  const {
    distanceRandom,
    //  timeEstimate
  } = randomDistanceTimeEstimate();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const { data: foodsId, isLoading } = useGetFoodByListId(
    cart.map((item: ICart) => item.id),
  );
  const [isDistanceAndTimeSet, setIsDistanceAndTimeSet] =
    useState<boolean>(false);

  useEffect(() => {
    if (cart.length > 0 && !isDistanceAndTimeSet) {
      setCartDistance(distanceRandom);
      setCartTimeArrival(1 as number);
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
      let potentialTotal = 0;

      foodsId.forEach((item) => {
        total += item.priceNumber * (quantities[item.id] || 1);
        potentialTotal = total + item.priceNumber;
      });

      setTotalPrice(total);
      const updatedDiscountInfo = { priceReduce: 0, totalPriceDiscount: total };
      setDiscountInfo(updatedDiscountInfo);

      if (potentialTotal >= 2000000) {
        onOpen();
      }
    }
  }, [quantities]);

  useClickOutside(cartSidebarRef, () => {
    if (cartExpand) setCartExpand(!cartExpand);
  });

  const handleNavigate = () => {
    navigate("/checkout");
    setCartExpand(false);
  };

  return (
    <div>
      {cartExpand && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setCartExpand(false)}
        />
      )}
      {
        <div className="z-999 absolute ">
          <ModalNotification
            title="Bạn đã vượt quá giới hạn của hoá đơn!"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            Tổng giá trị mỗi hoá đơn chỉ dưới 2.000.000 VNĐ.
          </ModalNotification>
        </div>
      }
      {cart.length > 0 ? (
        <>
          <div
            ref={cartSidebarRef}
            className={`fixed transition-all ${
              cartExpand ? "" : "translate-x-full"
            } right-0 z-50 flex h-full items-center `}
          >
            <div className="h-[100vh] min-w-[475px] bg-white shadow-lg">
              <div
                className={`${
                  cartExpand ? "" : "hidden"
                } flex flex-col justify-center items-center p-4 border-b border-gray-200`}
              >
                <h1 className="text-xl font-bold">Cart</h1>
                <button className="text-default-400">
                  Estimate time delivery: {cartTimeArrival} phút ~{" "}
                  {cartDistance}
                </button>
                <div />
              </div>
              {isLoading && (
                <div className="absolute flex justify-center w-full h-1/2">
                  <Loading />
                </div>
              )}
              <CartContent />
              <div className="flex bg-white z-50 flex-col w-full h-[10rem] absolute bottom-0 shadow-[rgba(0,0,16,0.5)_6px_-6px_4px_-8px] justify-center items-center p-4 gap-5">
                <div className="flex justify-between w-[98%]">
                  <h1 className="text-lg font-bold">Total:</h1>
                  <p className="text-lg font-regular">
                    {formatVnCurrency(totalPrice)}
                  </p>
                </div>
                <button
                  className="w-[98%] h-12 bg-black rounded text-white font-bold"
                  onClick={handleNavigate}
                >
                  Xem lại đơn hàng
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CartEmpty cartSidebarRef={cartSidebarRef} />
      )}
    </div>
  );
};

export default CartSidebar;
