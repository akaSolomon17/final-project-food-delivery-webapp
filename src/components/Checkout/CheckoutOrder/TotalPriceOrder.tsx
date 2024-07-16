import { formatVnCurrency } from "../../../utils/formatCurrency";
import { useDiscountInfo, useTotalPrice } from "../../../zustand/cartStore";

const TotalPriceOrder = () => {
  const totalPrice = useTotalPrice();
  const discountInfo = useDiscountInfo();
  const discountPrice = discountInfo.totalPriceDiscount;

  return (
    <div className="w-[624px] flex flex-col">
      <h2 className="font-semibold text-xl text-left">Tổng cộng</h2>
      <div className="flex items-center gap-2 h-[28px]">
        <h2 className="font-bold text-xl text-left">
          {formatVnCurrency(discountPrice)}
        </h2>
        {!(discountPrice === totalPrice) && (
          <h2 className="font-medium text-md text-left line-through">
            {totalPrice}
          </h2>
        )}
      </div>
    </div>
  );
};

export default TotalPriceOrder;
