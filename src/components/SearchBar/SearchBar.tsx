import { Avatar, Divider, Input, Spinner, } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import React, { useRef, useState } from "react";

import './SearchBar.css'
import DropdownFilter from "../Dropdown/DropdownFilter";
import { useGetSearch } from "../../apis/products/getFoodList.api";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../utils/debounce";

export const SearchBar = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate()

    // State => Zustand later
    const [searchKeyword, setSearchKeyword] = useState<string>('null');
    const [activeSearch, setActiveSearch] = useState<{ id: string, title: string, img: string }[]>([]);

    const { data: searchResult, isLoading } = useGetSearch(searchKeyword)

    // Get id, title and img from search result
    const foodListSearchData = searchResult?.data?.map(((item: { id: string, title: string, img: string }) => ({
        id: item.id,
        title: item.title,
        img: item.img
    })));

    const debouncedSearch = debounce((value: string) => {
        setSearchKeyword(value);
        setActiveSearch(foodListSearchData &&
            foodListSearchData.filter(
                (item: { id: string, title: string, img: string }) => item.title.toLowerCase().includes(value.toLowerCase())
            )
        );
    }, 500);

    // Handle search trigger
    const handleSearchTrigger = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()

        if (value === '') {
            setSearchKeyword("null")
            setActiveSearch([])
            return false
        }
        //Debounce search
        debouncedSearch(value)
    }

    // Handle item click
    const handleItemClick = (id: string) => {
        navigate(`/product-details/${id}`);
        setActiveSearch([])
        setSearchKeyword("null");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <div>
            <div className='flex justify-center mt-10'>
                <div className="flex items-center">
                    <div className="search-bar relative">
                        <div className="w-fit h-[3rem] flex justify-center items-center text-black">
                            <Input
                                ref={inputRef}
                                label="Search"
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
                                endContent={
                                    isLoading && <Spinner color="primary" labelColor="foreground" size="sm" />
                                }
                                type="text"
                                onChange={(e) => (handleSearchTrigger(e))}
                            // onFocusChange={() => this.value = ""}
                            />
                        </div>
                        {activeSearch?.length > 0 &&
                            <div className="search-dropdown absolute top-14 p-4 shadow-lg border-1 bg-white text-black w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50 overflow-y-scroll max-h-[300px]">
                                {activeSearch.map((item, index) => (
                                    <div key={index}
                                        className='cursor-pointer w-full h-full text-left' onClick={() => handleItemClick(item?.id)}>
                                        <div className="flex items-center">
                                            <Avatar
                                                isBordered
                                                size="lg"
                                                radius="md"
                                                src={item?.img || ""}
                                                className="w-10 h-10 object-cover me-5"
                                            />
                                            <div className="">{item?.title}</div>
                                        </div>
                                        <Divider className=" mt-2" />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    <div>
                        <DropdownFilter />
                    </div>
                </div>
            </div>

        </div >
    )
}
