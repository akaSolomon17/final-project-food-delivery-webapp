import { useNavigate } from "react-router-dom";

const EmptyOrder = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <h1 className="text-xl font-bold">Đơn hàng trống!</h1>
      <p className="text-sm text-default-400">
        Vui lòng thêm sản phẩm vào giỏ hàng để đặt mua!
      </p>
      <p
        className="cursor-pointer text-[#48BFE5]"
        onClick={() => navigate("/menu")}
      >
        Xem qua các món
      </p>
    </div>
  );
};

export default EmptyOrder;
