import React, { useEffect, useState } from 'react'
import { Radio, RadioGroup, Slider, Dropdown, DropdownSection, Checkbox, DropdownTrigger, Button, DropdownMenu, DropdownItem, Input, CheckboxGroup, } from '@nextui-org/react'
import { IoFilterOutline, IoRemoveOutline } from "react-icons/io5";
import { StarIcon } from "../StarRating/Star";
import './DropdownFilter.css'
import { useSearchParams } from 'react-router-dom';
const disableHover = "disable-hover border-0"

const DropdownFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValue, setFilterValue] = useState([30000, 300000]);
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState('0');

  // Initialize state from URL search parameters
  useEffect(() => {
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const categories = searchParams.get('categories');
    const rating = searchParams.get('rating');

    if (priceMin && priceMax) {
      setFilterValue([Number(priceMin), Number(priceMax)]);
    }

    if (categories) {
      setSelectedCheckboxes(categories.split(','));
    }

    if (rating) {
      setSelectedRating(rating);
    }
  }, [searchParams]);

  // HANDLE EVENT
  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setFilterValue(value as [number, number])
    }
  };

  const handleOnChangeValueSlider = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setFilterValue(value as [number, number])
    }
  }

  const handleCheckboxChange = (value: string[]) => {
    setSelectedCheckboxes(value);
  }

  const handleRadioChange = (value: string) => {
    setSelectedRating(value);
  };
  const handleApplyFilters = () => {
    // setApplyingFilters(true); // Đang áp dụng filter

    //  SET FILTER VALUE TO SEARCH PARAMS
    searchParams.set('priceMin', filterValue[0].toString());
    searchParams.set('priceMax', filterValue[1].toString());
    searchParams.set('categories', selectedCheckboxes.join(','));
    searchParams.set('rating', selectedRating);
    setSearchParams(searchParams);

    // Thực hiện gọi API hoặc hook ở đây
    // Sử dụng useGetFoodFiltered khi áp dụng filter
  };

  return (
    <div className='flex items-center h-[48px]'>
      {/* DROPDOWN */}
      <Dropdown
        closeOnSelect={false}
        backdrop="opaque"
        showArrow
        classNames={{
          base: "before:bg-default-200 w-[268px]", // change arrow background
          content: "p-0 border-small border-divider bg-background",
        }}
      >
        <DropdownTrigger>
          <Button
            disableAnimation
            className="ms-[3rem] border-black cursor-pointer select-none bg-black text-white"
            radius="full"
          >
            <IoFilterOutline size={35} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded"
        >
          {/* FILTER */}
          <DropdownSection title="FILTER" showDivider >
            <DropdownItem key="option1" className={disableHover} textValue="Kimbap" >
              <CheckboxGroup value={selectedCheckboxes} onChange={handleCheckboxChange}>
                <Checkbox value="Kimbap" radius='none' >Kimbap</Checkbox>
                <Checkbox value="Tokbokki" radius='none'>Tokbokki</Checkbox>
                <Checkbox value="Gà" radius='none'>Gà</Checkbox>
                <Checkbox value="Lẩu" radius='none'>Lẩu</Checkbox>
              </CheckboxGroup>
            </DropdownItem>
          </DropdownSection >

          {/* PRICE */}
          <DropdownSection title="PRICE" className="" showDivider>
            <DropdownItem className={disableHover} textValue="Price Slider" isReadOnly>
              <div className="flex flex-row items-center justify-between">
                <Input
                  radius="sm"
                  type="number"
                  defaultValue="0"
                  value={`${filterValue[0]}`}
                  className="max-w-[10rem] w-[100px]"
                  endContent="₫"
                  onChange={(e) => handlePriceChange([Number(e.target.value), filterValue[1]])}
                />
                <IoRemoveOutline className="" />
                <Input
                  radius="sm"
                  type="number"
                  defaultValue="0"
                  value={`${filterValue[1]}`}
                  className="max-w-[10rem] w-[100px]"
                  endContent="₫"
                  onChange={(e) => handlePriceChange([filterValue[0], Number(e.target.value)])}
                />
              </div>
              <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center mt-2">
                <Slider
                  label="Select a budget"
                  formatOptions={{ style: "currency", currency: "VND" }}
                  step={5000}
                  maxValue={300000}
                  minValue={30000}
                  defaultValue={[30000, 300000]}
                  value={filterValue}
                  onChange={handleOnChangeValueSlider}
                  className="max-w-md"
                // color="foreground"
                />
                <p className="text-default-500 font-medium text-small">
                  {/* Selected budget: {Array.isArray(filterValue) && filterValue.map((b) => `₫${b}`).join(" – ")} */}
                  0 products found
                </p>
              </div>
            </DropdownItem>
          </DropdownSection>

          {/* CUSTOMER REVIEW */}
          <DropdownSection title="CUSTOMER REVIEW">
            <DropdownItem key="option1" className={disableHover} textValue="Any Rating" isReadOnly>
              <RadioGroup
                value={selectedRating}
                onChange={(e) => handleRadioChange(e.target.value)}
              >
                <Radio value="0"> Any Rating</Radio>
                <Radio value="4" className="radio-btn"  ><StarIcon size={15} value={4} /> & Up</Radio>
                <Radio value="3" className="radio-btn"  ><StarIcon size={15} value={3} /> & Up</Radio>
                <Radio value="2" className="radio-btn"  ><StarIcon size={15} value={2} /> & Up</Radio>
              </RadioGroup>
            </DropdownItem>
            <DropdownItem className="apply-btn border-0 disable-hover" textValue='none' closeOnSelect>
              <Button color='primary' radius='full' className='h-[30px]' onClick={handleApplyFilters}>
                Apply Filter
              </Button>
            </DropdownItem>
          </DropdownSection >
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default DropdownFilter