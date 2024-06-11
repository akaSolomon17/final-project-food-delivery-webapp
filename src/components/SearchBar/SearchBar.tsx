import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import { RiArrowDropDownFill, RiDiscountPercentFill } from "react-icons/ri";
import React from "react";

import './SearchBar.css'
import DropdownFilter from "../Dropdown/DropdownFilter";

export const SearchBar = () => {

    return (
        <div>
            <div className='flex justify-center mt-10'>
                <div className="flex gap-16">
                    <div className="flex gap-2 items-center">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    radius="full"
                                    className="w-full h-[50px] bg-white"
                                >
                                    <RiDiscountPercentFill className='size-6' />
                                    <p className='font-sans font-semibold'>Best deals</p>
                                    <RiArrowDropDownFill className='size-6' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new">10% Discount</DropdownItem>
                                <DropdownItem key="copy">20% Discount</DropdownItem>
                                <DropdownItem key="edit">30% Discount</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="search-bar">
                        <div className="w-fit h-[3rem] flex justify-center items-center text-black">
                            <Input
                                label="Search"
                                isClearable
                                size="sm"
                                radius="lg"
                                classNames={{
                                    label: "text-black/50 dark:text-white/90",
                                    input: [
                                        "bg-transparent",
                                        "text-black/90 dark:text-white/90",
                                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                    ],
                                    innerWrapper: "bg-transparent",
                                    inputWrapper: [
                                        "w-[29rem]",
                                        "border-1",
                                        "bg-default-200/50",
                                        "dark:bg-default/60",
                                        "backdrop-blur-xl",
                                        "backdrop-saturate-200",
                                        "hover:bg-default-200/70",
                                        "dark:hover:bg-default/70",
                                        "group-data-[focus=true]:bg-default-200/50",
                                        "dark:group-data-[focus=true]:bg-default/60",
                                        "!cursor-text",
                                    ],
                                }}
                                placeholder="Search for anything..."
                                startContent={
                                    <IoIosSearch />
                                }
                            />
                            <DropdownFilter />
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}
