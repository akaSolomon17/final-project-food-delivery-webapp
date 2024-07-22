/* eslint-disable react-hooks/exhaustive-deps */
import {
  useCart,
  useCartActions,
  useQuantities,
  useTotalPrice,
} from "../../zustand/cartStore";
import { Image } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ICart, IQuantities } from "../../types/carts.type";
import { Food } from "../../types/foods.type";
import { useGetFoodByListId } from "../../apis/products/getFoodById.api";
import { ECartOrder } from "../../types/enums.type";
import { calcTotalPriceEachItem } from "../../utils/calcTotalPriceItem";

const { MAX_QUANTITY_PER_BILL } = ECartOrder;

const CartItem: FC<{ item: Food }> = ({ item }) => {
  const cart = useCart();
  const quantities = useQuantities();
  const totalPrice = useTotalPrice();
  const [isRemove, setIsRemove] = useState<string | null>(null);
  const {
    setQuantities,
    setCart,
    setTotalPrice,
    loadFromLocalStorage,
    setIsExceedLimit,
  } = useCartActions();

  const { data: foodsId } = useGetFoodByListId(
    cart.map((item: ICart) => item.id),
  );

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  // QUANTITY INITIAL
  useEffect(() => {
    if (foodsId) {
      const initialQuantities: IQuantities = {};
      cart.forEach((item) => {
        initialQuantities[item.id] = item.quantity; // Initial quantity from quantity in cart(local storage)
      });

      setQuantities(initialQuantities);
    }
  }, [foodsId]);

  const handleCartChange = (itemId: string, change: number) => {
    const foodItem = foodsId?.find((item) => item.id === itemId);
    if (!foodItem) return;

    const potentialTotal = totalPrice + change * foodItem.priceNumber;

    const updateQuantities = (prevQuantities: IQuantities) => {
      const newQuantities = { ...prevQuantities };
      const newQuantity = newQuantities[itemId] + change;

      if (newQuantity <= 0) {
        setIsRemove(itemId);
      } else if (newQuantity > MAX_QUANTITY_PER_BILL) {
        newQuantities[itemId] = MAX_QUANTITY_PER_BILL;
      } else if (potentialTotal < 2000000) {
        newQuantities[itemId] = newQuantity;
        setIsExceedLimit(false);
        setIsRemove(null);
      } else {
        setIsExceedLimit(true);
        return prevQuantities;
      }
      const updatedCart: ICart[] = cart.map((item: ICart) =>
        item.id === itemId
          ? { ...item, quantity: newQuantities[itemId] }
          : item,
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return newQuantities;
    };

    setQuantities(updateQuantities(quantities));
  };

  const handleDeleteFromCart = (id: string) => {
    const updateCart = (prevCart: ICart[]): ICart[] => {
      const newCart = prevCart.filter((item: ICart) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      if (newCart.length === 0) {
        setTotalPrice(0);
      }
      return newCart;
    };
    setCart(updateCart(cart));

    const updateQuantities = (prevQuantities: IQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[id];
      return newQuantities;
    };
    setQuantities(updateQuantities(quantities));
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-200 pb-4 gap-2">
      <div className="flex gap-3 items-center">
        <div className="flex justify-center items-center">
          {/* MINUS BUTTON */}
          <button
            type="button"
            className="cursor-pointer min-w-[1rem]"
            onClick={() => handleCartChange(item.id as string, -1)}
          >
            <AiOutlineMinus size={13} color="#00A5CF" />
          </button>

          <span className="w-6 text-center select-none">
            {(quantities[item.id ?? ""] || "") as string}
          </span>

          {/* PLUS BUTTON */}
          <button
            type="button"
            className="cursor-pointer min-w-[1rem]"
            onClick={() => handleCartChange(item.id as string, 1)}
          >
            <AiOutlinePlus size={13} color="#00A5CF" />
          </button>
        </div>
        <Image
          width={60}
          radius="none"
          src={item.img as string}
          alt="Food cover"
          className="select-none"
        />
        <div>
          <h1 className="text-sm font-semibold">{item.title}</h1>
          <p className="scrollbar-hide overflow-scroll max-w-[255px] max-h-[70px] text-sm">
            {item.description}
          </p>
        </div>
      </div>
      <div>
        {isRemove === item.id ? (
          <button
            type="button"
            className="text-red-500 text-sm font-bold w-[60px]"
            onClick={() => handleDeleteFromCart(item.id as string)}
          >
            Remove
          </button>
        ) : (
          <p className="text-sm w-[60px] min-w-[58px] text-right">
            {calcTotalPriceEachItem(
              quantities,
              item.priceNumber,
              item.id as string,
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
