import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Switch, Chip } from "@nextui-org/react";
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
        name: "About",
        link: "/about",
        icon: null
    },
    {
        name: "Cart",
        link: "/cart-detail",
        icon: <PiShoppingCartSimple />
    },
    {
        name: "Swiper",
        link: "/swiper",
        icon: <LuUser2 />
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
                    (<NavbarItem key={index}>
                        <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to={item.link}>
                            {item.icon}
                        </NavLink>
                    </NavbarItem>))}
                </NavbarContent>
            </Navbar >
            <Outlet />
        </>
    );
}
