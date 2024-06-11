import React from 'react'
import { Radio, RadioGroup, Slider, Dropdown, DropdownSection, Checkbox, DropdownTrigger, Button, DropdownMenu, DropdownItem, Input, } from '@nextui-org/react'
import { IoFilterOutline, IoRemoveOutline } from "react-icons/io5";
import { StarIcon } from "../StarRating/Star";

const DropdownFilter = () => {
  const [value, setValue] = React.useState<number[]>([100, 300]);

  const handleOnChangeValueSlider = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue(value);
    }
  }

  const disableHover = "hover:bg-transparent cursor-default border-0 flex justify-center"

  return (
    <div>
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
        <DropdownMenu variant="faded" >
          {/* FILTER */}
          <DropdownSection title="FILTER" showDivider >
            <DropdownItem key="option1" className={disableHover} textValue="Kimbap">
              <div>
                <Checkbox value="tokyo">Kimbap</Checkbox>
              </div>
            </DropdownItem>
            <DropdownItem key="option2" className={disableHover} textValue="Tokbokki">
              <Checkbox value="buenos-aires">Tokbokki</Checkbox>
            </DropdownItem>
            <DropdownItem key="option3" className={disableHover} textValue="Gà">
              <Checkbox value="sydney">Gà</Checkbox>
            </DropdownItem>
            <DropdownItem key="option4" className={disableHover} textValue="Lẩu">
              <Checkbox value="san-francisco">Lẩu</Checkbox>
            </DropdownItem>
          </DropdownSection >
          {/* PRICE */}
          <DropdownSection title="PRICE" className="" showDivider>
            <DropdownItem isReadOnly className="hover:bg-transparent cursor-default border-0" textValue={`Price Slider from ₫${value[0]} to ₫${value[1]}`}>
              <div className="flex flex-row items-center justify-between">
                <Input
                  radius="sm"
                  type="number"
                  defaultValue="0"
                  value="10000"
                  className="max-w-[10rem] w-[100px]"
                  endContent="₫"
                />
                <IoRemoveOutline className="" />
                <Input
                  radius="sm"
                  type="number"
                  defaultValue="0"
                  value="100000"
                  className="max-w-[10rem] w-[100px]"
                  endContent="₫"
                />
              </div>
              <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
                <Slider
                  label="Select a budget"
                  formatOptions={{ style: "currency", currency: "VND" }}
                  step={5000}
                  maxValue={300000}
                  minValue={30000}
                  value={value}
                  onChange={handleOnChangeValueSlider}
                  className="max-w-md"
                />
                <p className="text-default-500 font-medium text-small">
                  Selected budget: {Array.isArray(value) && value.map((b) => `₫${b}`).join(" – ")}
                  {/* ... products found */}
                </p>
              </div>
            </DropdownItem>
          </DropdownSection>
          {/* CUSTOMER REVIEW */}
          <DropdownSection title="CUSTOMER REVIEW">
            <DropdownItem key="option1" className={disableHover} isReadOnly textValue="Any Rating">
              <RadioGroup >
                <Radio value="any-thing">Any Rating</Radio>
                <Radio value="four-stars" className="radio-btn"><StarIcon size={15} value={4} /> & Up</Radio>
                <Radio value="three-stars" className="radio-btn"><StarIcon size={15} value={3} /> & Up</Radio>
                <Radio value="two-stars" className="radio-btn"><StarIcon size={15} value={2} /> & Up</Radio>
              </RadioGroup>
            </DropdownItem>
            <DropdownItem className="apply-btn hover:bg-transparent cursor-default border-0 hover:bg-white" closeOnSelect>
              <Button color="primary">
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