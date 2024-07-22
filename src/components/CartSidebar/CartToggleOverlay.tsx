import { useCartActions } from "../../zustand/cartStore";

const CartToggleOverlay = () => {
  const { setCartExpand } = useCartActions();

  return (
    <div
      className="fixed inset-0 bg-black opacity-50 z-40"
      onClick={() => setCartExpand(false)}
    />
  );
};

export default CartToggleOverlay;
