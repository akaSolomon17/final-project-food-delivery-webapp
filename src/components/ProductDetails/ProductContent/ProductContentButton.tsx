import {
  useCartActions,
  useQuantities,
  useTotalPrice,
} from "../../../zustand/cartStore";
import {
  useProductDetailsActions,
  useQuantity,
} from "../../../zustand/productDetailStore";
import { useMemo, useState } from "react";
import { Button } from "@nextui-org/react";
import { BiSolidCart } from "react-icons/bi";
import { notify } from "../../../hooks/Toastify/notify";
import { useNavigate, useParams } from "react-router-dom";
import { EToastifyStatus } from "../../../types/enums.type";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useGetFoodById } from "../../../apis/products/getFoodById.api";
import { foodInitialData } from "../../../../public/data/checkoutConstants";

const { TOAST_SUCCESS } = EToastifyStatus;

const ProductContentButton = () => {
  const navigate = useNavigate();
  const quantity = useQuantity();
  const { productId } = useParams();
  const totalPrice = useTotalPrice();
  const quantities = useQuantities();
  const { setQuantity } = useProductDetailsActions();
  const { setCart, setQuantities } = useCartActions();
  const [isOrderNow, setIsOrderNow] = useState<boolean>(false);
  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const { foodId } = useGetFoodById(productId || "0");
  const foodIdData = useMemo(() => {
    return foodId?.data || foodInitialData;
  }, [foodId]);

  const handleDecrementQuantity = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleAddToCart = (productId: string, productName: string) => {
    if (totalPrice + quantity * foodIdData.priceNumber > 2000000) {
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");

    const existingProduct = cart.find(
      (item: { id: string }) => item.id === productId,
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
      setQuantities({ ...quantities, [productId]: existingProduct.quantity });
    } else {
      setCart([...cart, { id: productId, quantity }]);

      cart.push({ id: productId, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    !isOrderNow &&
      notify(`Thêm ${productName} vào giỏ hàng thành công!`, TOAST_SUCCESS);
  };

  const handleOrderNow = () => {
    if (totalPrice + quantity * foodIdData.priceNumber > 2000000) {
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    setIsOrderNow(true);
    navigate("/checkout");
    if (foodIdData.id) {
      cart.length = 0;
      localStorage.setItem("cart", JSON.stringify(cart));
      handleAddToCart(foodIdData.id, foodIdData.title);
    } else return;
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Button radius="full" onClick={handleDecrementQuantity}>
          <AiOutlineMinus />
        </Button>
        <h1 className="font-lato font-semibold">{quantity}</h1>
        <Button radius="full" onClick={handleIncrementQuantity}>
          <AiOutlinePlus />
        </Button>
      </div>
      <div className="flex gap-4">
        <Button
          className="bg-black text-white font-lato w-[15rem]"
          radius="full"
          onClick={handleOrderNow}
        >
          Order Now
        </Button>
        <Button
          className="bg-white font-lato w-[9rem] border-2"
          radius="full"
          onClick={() =>
            handleAddToCart(foodIdData.id as string, foodIdData.title)
          }
          startContent={<BiSolidCart color="#BCBFC2" size={18} />}
        >
          Add to Cart
        </Button>
      </div>
    </>
  );
};

export default ProductContentButton;
