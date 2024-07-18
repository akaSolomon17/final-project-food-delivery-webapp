import { Button } from "@nextui-org/react";

import TotalPriceOrder from "./TotalPriceOrder";
import { useAddHistoryOrders } from "../../../apis/orders/addHistoryOrdersList.api";

const CheckoutOrder = () => {
  const { isPending } = useAddHistoryOrders();
  return (
    <div className="fixed z-50 bottom-0 w-full shadow-[rgba(0,0,16,0.5)_6px_-6px_4px_-8px]">
      <div className="flex bg-white h-[100px] justify-center items-center">
        <TotalPriceOrder />
        <Button
          className="bg-black text-white w-[264px]"
          radius="sm"
          type="submit"
          isLoading={isPending}
        >
          Đặt đơn
        </Button>
      </div>
    </div>
  );
};

export default CheckoutOrder;
