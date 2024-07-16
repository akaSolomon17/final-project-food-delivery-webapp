import OrderInfo from "../components/Checkout/OrderInfo/OrderInfo";
import OrderVoucher from "../components/Checkout/OrderVoucher/OrderVoucher";
import DetailsPayment from "../components/Checkout/DetailsPayment";
import DeliveryInfo from "../components/Checkout/DeliveryInfo/DeliveryInfo";
import CheckoutOrder from "../components/Checkout/CheckoutOrder/CheckoutOrder";
import { useGetFoodByIds } from "../apis/products/getFoodById.api";
import { ICart } from "../types/carts.type";
import {
  useCart,
  useCartActions,
  useDiscountInfo,
  useTotalPrice,
} from "../zustand/cartStore";
import EmptyOrder from "../components/Checkout/EmptyOrder";
import CheckoutHeader from "../components/Checkout/CheckoutHeader";
import Loading from "../components/Loading/Loading";
import { FormProvider, useForm } from "react-hook-form";
import { EOrderStatus, EToastifyStatus } from "../types/enums.type";
import { useNavigate } from "react-router-dom";
import { useUpdateOrderStatus } from "../utils/changeOrderStatus";
import { useGetHistoryOrdersList } from "../apis/orders/getHistoryOrdersList.api";
import { useAddHistoryOrders } from "../apis/orders/addHistoryOrdersList.api";
import { Food } from "../types/foods.type";
import { IHistoryOrders, IOrderDetails } from "../types/historyOrders.type";
import { useGetFoodList } from "../apis/products/getFoodList.api";
import { notify } from "../hooks/Toastify/notify";
import { ICheckoutProps } from "../types/checkout.type";

const { COMPLETED, DELIVERING } = EOrderStatus;
const { TOAST_ERROR } = EToastifyStatus;
const cardOptions = ["3439", "4987", "1234", "5678"];
const userProfile = ["Personal", "Huy"];

const checkoutDefaultValues: ICheckoutProps = {
  address: "132-136 Lê Đình Lý, P.Hoà Thuận Đông, Q.Hải Châu, TP.Đà Nẵng",
  note: "",
  payment: cardOptions[0],
  profile: userProfile[0],
};

const Checkout = () => {
  const methods = useForm<ICheckoutProps>({
    defaultValues: checkoutDefaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;

  const address = watch("address");
  const note = watch("note");
  // const payment = watch("payment");
  // const profile = watch("profile");

  const navigate = useNavigate();
  const totalPrice = useTotalPrice();
  const discountInfo = useDiscountInfo();
  const discountPrice = discountInfo.totalPriceDiscount;

  const cart = useCart();
  const { setCart, setTotalPrice, setNote } = useCartActions();
  const { updateOrderStatus } = useUpdateOrderStatus();

  const { data: historyOrderList } = useGetHistoryOrdersList();
  const historyOrderListData = historyOrderList?.data;

  const { mutate: addHistoryOrderMutate } = useAddHistoryOrders();

  const { data: foodList } = useGetFoodList();
  const foodListData = foodList?.data;

  const getFoodInCart = foodListData?.filter((food: Food) =>
    cart.map((item) => item.id).includes(food.id as string),
  );

  const { data: foodsId, isLoading } = useGetFoodByIds(
    cart.map((item: ICart) => item.id),
  );
  const rows = foodsId ?? [];

  const handleAddOrder = (data: ICheckoutProps) => {
    console.log("🚀 ~ data:", data);

    const date = Date.now();
    setTotalPrice(0);
    setNote(note);

    const detailOrder = getFoodInCart?.map((food: Food): IOrderDetails => {
      return {
        id: String(food.id),
        title: food.title,
        priceNumber: String(food.priceNumber),
        quantity:
          cart.find((item) => item.id === food.id)?.quantity.toString() || "1",
      };
    });

    const newHistoryOrders: IHistoryOrders = {
      id: (historyOrderListData?.length + 1).toString(),
      status: DELIVERING,
      orderDate: date,
      totalPrice: totalPrice,
      discountPrice: discountPrice,
      note: note,
      orderDetails: detailOrder,
    };

    addHistoryOrderMutate(
      { newHistoryOrders },
      {
        onSuccess: () => {
          navigate("/your-order");
          updateOrderStatus(COMPLETED, newHistoryOrders.id);
          setCart([]);
        },
        onError: () => {
          notify("Đặt đơn thất bại", TOAST_ERROR);
        },
      },
    );
  };

  return (
    <div className="bg-[#F7F7F7] h-full">
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {rows.length > 0 ? (
            <>
              <CheckoutHeader />
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(handleAddOrder)}
                  className="h-full"
                >
                  <DeliveryInfo
                    setValue={setValue}
                    address={address}
                    note={note}
                  />
                  <OrderInfo />
                  <DetailsPayment
                    payments={cardOptions}
                    profiles={userProfile}
                  />
                  <OrderVoucher />
                  <CheckoutOrder />
                </form>
              </FormProvider>
            </>
          ) : (
            <EmptyOrder />
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;
