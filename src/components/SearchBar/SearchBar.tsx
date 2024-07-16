import { Avatar, Divider, Input, Spinner } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import React, { useRef, useState } from "react";
import "./SearchBar.css";
import { useGetSearch } from "../../apis/products/getFoodList.api";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../utils/debounce";
import { IActiveSearch } from "../../types/foods.type";

const inputWrapper = [
  "w-[14.7rem]",
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
];

const input = [
  "bg-transparent",
  "text-black/90 dark:text-white/90",
  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
];

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>("null");
  const [activeSearch, setActiveSearch] = useState<IActiveSearch[]>([]);
  const { data: searchResult, isLoading } = useGetSearch(searchKeyword);

  const foodListSearchData = searchResult?.data?.map(
    (item: { id: string; title: string; img: string }) => ({
      id: item.id,
      title: item.title,
      img: item.img,
    }),
  );

  const debouncedSearch = debounce((value: string) => {
    setSearchKeyword(value);
    setActiveSearch(
      foodListSearchData &&
        foodListSearchData.filter(
          (item: { id: string; title: string; img: string }) =>
            item.title.toLowerCase().includes(value.toLowerCase()),
        ),
    );
  }, 500);

  const handleSearchTrigger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value === "") {
      setSearchKeyword("null");
      setActiveSearch([]);
      return false;
    }
    debouncedSearch(value);
  };

  const handleItemClick = (id: string) => {
    navigate(`/product-details/${id}`);
    setActiveSearch([]);
    setSearchKeyword("null");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-2">
        <div className="flex items-center">
          <div className="search-bar relative">
            <div className="w-fit h-[3rem] flex justify-center items-center text-black">
              <Input
                ref={inputRef}
                label="Search"
                size="sm"
                radius="sm"
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: input,
                  innerWrapper: "bg-transparent",
                  inputWrapper: inputWrapper,
                }}
                placeholder="Search for food..."
                startContent={<IoIosSearch />}
                endContent={
                  isLoading && (
                    <Spinner
                      color="primary"
                      labelColor="foreground"
                      size="sm"
                    />
                  )
                }
                type="text"
                onChange={(e) => handleSearchTrigger(e)}
              />
            </div>
            {activeSearch?.length > 0 && (
              <div className="search-dropdown">
                {activeSearch.map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer w-full h-full text-left"
                    onClick={() => handleItemClick(item?.id)}
                  >
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
