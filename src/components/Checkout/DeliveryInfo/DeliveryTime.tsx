import {
  useCartDistance,
  useCartTimeArrival,
} from "../../../zustand/cartStore";

const DeliveryTime = () => {
  const cartDistance = useCartDistance();
  const cartTimeArrival = useCartTimeArrival();

  return (
    <div className="p-4">
      <h5 className="text-default-400 text-sm">Thời gian giao hàng dự kiến</h5>
      <p className="text-md font-semibold">
        ~{cartTimeArrival} phút ({cartDistance})
      </p>
    </div>
  );
};

export default DeliveryTime;
