import { FC } from "react";
import {
  useCart,
  useCartActions,
  useCartDistance,
  useCartExpand,
  useCartTimeArrival,
  useTotalPrice,
} from "../../zustand/cartStore";
import Loading from "../Loading/Loading";
import { useGetFoodByListId } from "../../apis/products/getFoodById.api";
import { ICart } from "../../types/carts.type";
import { formatVnCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

const CartLayout: FC<{
  cartSidebarRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}> = ({ cartSidebarRef, children }) => {
  const cart = useCart();
  const navigate = useNavigate();
  const cartExpand = useCartExpand();
  const totalPrice = useTotalPrice();
  const cartDistance = useCartDistance();
  const cartTimeArrival = useCartTimeArrival();
  const { setCartExpand } = useCartActions();
  const { isLoading } = useGetFoodByListId(cart.map((item: ICart) => item.id));

  const handleNavigate = () => {
    navigate("/checkout");
    setCartExpand(false);
  };

  return (
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
              Estimate time delivery: {cartTimeArrival} phút ~ {cartDistance}
            </button>
            <div />
          </div>
          {isLoading && (
            <div className="absolute flex justify-center w-full h-1/2">
              <Loading />
            </div>
          )}
          {children}
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
  );
};

export default CartLayout;
