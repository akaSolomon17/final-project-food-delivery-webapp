import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Image, Button } from "@nextui-org/react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineDarkMode } from "react-icons/md";

export default function App() {
    return (
        <Navbar >
            <NavbarBrand>
                <Button disableAnimation >
                    <Image
                        width={32}
                        alt="brand logo"
                        src="/takeaway.png"
                        radius="none"
                    />
                </Button>
            </NavbarBrand>
            <NavbarContent className="w-[60rem] sm:flex" justify="start">
                <NavbarItem className="me-5">
                    <Link color="foreground" href="/home">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem className="me-5">
                    <Link href="/menu" color="foreground">
                        Menu
                    </Link>
                </NavbarItem>
                <NavbarItem className="me-5">
                    <Link color="foreground" href="/about">
                        About
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="">
                    <MdOutlineDarkMode />
                    {/* <MdLightMode /> */}
                </NavbarItem>
                <NavbarItem className=" ms-5">
                    <Link href="/cart-detail">
                        <PiShoppingCartSimple color="black" />
                    </Link>
                </NavbarItem>
                <NavbarItem className="ms-5 ">
                    <Link href="/users">
                        <LuUser2 color="black" />
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar >
    );
}
