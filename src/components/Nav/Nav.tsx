import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Switch, Chip } from "@nextui-org/react";
import { Link, Outlet } from "react-router-dom"
import { PiShoppingCartSimple } from "react-icons/pi";
import { LuUser2 } from "react-icons/lu";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";

export default function App() {
    return (
        <>
            <Navbar >
                <NavbarBrand>
                    <Chip>
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
                    <NavbarItem className="me-5">
                        <Link color="foreground" to="/">
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="me-5">
                        <Link to="/menu" color="foreground">
                            Menu
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="me-5">
                        <Link color="foreground" to="/about">
                            About
                        </Link>
                    </NavbarItem>
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
                    <NavbarItem >
                        <Link to="/cart-detail">
                            <PiShoppingCartSimple color="black" />
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="/swiper">
                            <LuUser2 color="black" />
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar >
            <Outlet />
        </>
    );
}
