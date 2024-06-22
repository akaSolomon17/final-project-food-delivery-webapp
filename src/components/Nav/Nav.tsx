import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Switch, Chip, Badge } from "@nextui-org/react";
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { PiShoppingCartSimple } from "react-icons/pi";
import { LuUser2 } from "react-icons/lu";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";

const link = [
    {
        name: "Home",
        link: "/",
        icon: null
    },
    {
        name: "Menu",
        link: "/menu",
        icon: null
    },
    {
        name: "Your Order",
        link: "/your-order",
        icon: null
    },
    {
        name: "Cart",
        link: "/cart-detail",
        icon: <Badge color="danger" content={1} size="sm" shape="circle"><PiShoppingCartSimple /></Badge>
    },
    {
        name: "Managements",
        link: "/managements",
        icon: <Badge content="" size="sm" color="success" shape="circle" placement="bottom-right"><LuUser2 /></Badge>
    },
]

export default function App() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar >
                <NavbarBrand className="cursor-pointer" onClick={() => navigate('/')}>
                    <Chip >
                        <Image
                            width={35}
                            alt="brand logo"
                            src="/logo.png"
                            radius="none"
                        />
                    </Chip>
                    <span className="ms-2 font-lg font-semibold font-sans">CHÓI'S KITCHEN</span>
                </NavbarBrand>
                <NavbarContent className="w-[60rem] sm:flex" justify="start">
                    {link.map((item, index) =>
                    (item.icon === null ?
                        <NavbarItem key={index} className="me-5">
                            <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to={item.link}>
                                {item.name}
                            </NavLink>
                        </NavbarItem> :
                        null
                    ))}
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Switch
                            defaultSelected
                            size="sm"
                            color="default"
                            thumbIcon={({ isSelected, className }) =>
                                isSelected ? (
                                    <MdOutlineDarkMode className={className} />
                                ) : (
                                    <MdLightMode className={className} />
                                )
                            }
                        >
                        </Switch>
                    </NavbarItem>
                    {link.map((item, index) =>
                    (<NavbarItem key={index} className="items-center justify-center">
                        <NavLink className={({ isActive }) => (isActive ? "text-red-500 items-center" : "text-black items-center")} to={item.link}>
                            {item.icon}
                        </NavLink>
                    </NavbarItem>))}
                </NavbarContent>
            </Navbar >
            <Outlet />
        </>
    );
}
