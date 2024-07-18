import { FC } from "react";
import { useCartExpand } from "../../zustand/cartStore";
import { ICartEmptyProps } from "../../types/carts.type";

const CartEmpty: FC<ICartEmptyProps> = ({ cartSidebarRef }) => {
  const cartExpand = useCartExpand();
  return (
    <div
      ref={cartSidebarRef}
      className={`fixed transition-all ${
        cartExpand ? "" : "translate-x-full"
      } right-0 z-50 flex h-full items-center `}
    >
      <div className="h-[114vh] min-w-[503px] bg-white shadow-lg">
        <div className="flex flex-col justify-center items-center h-full gap-4">
          <h1 className="text-xl font-semibold">Giỏ hàng trống!</h1>
          <p className="text-sm text-default-400">
            Vui lòng thêm sản phẩm vào giỏ hàng để đặt mua!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
