import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  Chip,
  Badge,
} from "@nextui-org/react";
import {
  useCart,
  useCartActions,
  useCartExpand,
} from "../../zustand/cartStore";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { PiShoppingCartSimple } from "react-icons/pi";
import { useEffect } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { INavProps } from "../../types/carts.type";

export const Nav: React.FC<INavProps> = ({ isCheckoutPage }) => {
  const navigate = useNavigate();
  const cart = useCart();
  const cartExpand = useCartExpand();
  const { setCartExpand, setCart } = useCartActions();

  const handleCartExpand = () => {
    setCartExpand(!cartExpand);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);

  const link = [
    {
      name: "Home",
      link: "/",
      icon: null,
    },
    {
      name: "Menu",
      link: "/menu",
      icon: null,
    },
    {
      name: "Your Order",
      link: "/your-order",
      icon: null,
    },
    {
      name: "Cart",
      link: null,
      icon: (
        <div className="cursor-pointer" onClick={handleCartExpand}>
          <Badge
            content={cart.length > 0 ? cart.length : ""}
            color={cart.length > 0 ? "danger" : "default"}
            size="sm"
            shape="circle"
          >
            <PiShoppingCartSimple color={cartExpand ? "red" : ""} />
          </Badge>
        </div>
      ),
    },
    {
      name: "Managements",
      link: "/managements",
      icon: <AiOutlineProduct size={17} />,
    },
  ];
  return (
    <>
      <Navbar className="shadow-[rgba(0,0,16,0.5)_6px_7px_4px_-8px]">
        <NavbarBrand className="cursor-pointer" onClick={() => navigate("/")}>
          <Chip>
            <Image width={35} alt="brand logo" src="/logo.png" radius="none" />
          </Chip>
          <span className="ms-2 font-lg font-semibold font-sans">
            CHÓI'S KITCHEN
          </span>
        </NavbarBrand>
        {!isCheckoutPage ? (
          <>
            <NavbarContent className="w-[60rem] sm:flex" justify="start">
              {link.map((item, index) =>
                item.icon === null ? (
                  <NavbarItem key={index} className="me-5">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-red-500" : "text-black"
                      }
                      to={item.link}
                    >
                      {item.name}
                    </NavLink>
                  </NavbarItem>
                ) : null,
              )}
            </NavbarContent>
            <NavbarContent justify="end">
              {link.map((item, index) => (
                <NavbarItem key={index} className="items-center justify-center">
                  <NavLink
                    className={({ isActive }) =>
                      item.link !== null && isActive
                        ? "text-red-500 items-center"
                        : "text-black items-center"
                    }
                    to={item.link ? item.link : "#"}
                  >
                    <div className="h-[18px] items-center">{item.icon}</div>
                  </NavLink>
                </NavbarItem>
              ))}
            </NavbarContent>
          </>
        ) : (
          <></>
        )}
      </Navbar>
      <Outlet />
    </>
  );
};
