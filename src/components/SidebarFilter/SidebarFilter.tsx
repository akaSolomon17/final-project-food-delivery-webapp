import React, { useEffect, useState } from 'react'
import { Radio, RadioGroup, Slider, Checkbox, Button, Input, CheckboxGroup } from '@nextui-org/react'
import { IoRemoveOutline } from "react-icons/io5";
import { StarIcon } from "../StarRating/Star";
import './SidebarFilter.css'
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import { useFilterActions } from '../../zustand/filteredStore';
import { useGetFoodCategories } from '../../apis/products/getFoodCategories.api';
import { FoodCategory } from '../../types/foods.type';

const SideBarFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValue, setFilterValue] = useState([30000, 300000]);
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState('0');
  const { setApplyingFilters } = useFilterActions()
  const { data: foodCategories } = useGetFoodCategories()
  const foodCategoriesList = foodCategories?.data

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
    searchParams.set('priceMin', String(filterValue[0]));
    searchParams.set('priceMax', String(filterValue[1]));
    searchParams.set('categories', selectedCheckboxes.join(','));
    searchParams.set('rating', selectedRating);
    setSearchParams(searchParams)
    setApplyingFilters(true)
  };

  // CHIA COMPONENT
  return (
    <div className='fixed z-40 flex flex-col h-full items-center'>
      <SearchBar />
      <div className="flex cursor-pointer mt-8" >
        <div className={`overflow-hidden flex flex-col justify-center border rounded-md shadow-lg bg-white min-h-[350px] h-[590px]`}>

          {/* FILTER CATEGORY */}
          <div className='p-2'>
            <CheckboxGroup value={selectedCheckboxes} onChange={handleCheckboxChange}>
              {
                foodCategoriesList?.map((category: FoodCategory, index: number) => (
                  <div key={index}>
                    <Checkbox value={category.name} radius='none'>{category.name}</Checkbox>
                  </div>
                ))
              }
            </CheckboxGroup>
          </div>

          {/* FILTER PRICE */}
          <div className=' p-2'>
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
              <IoRemoveOutline />
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
            <div className="flex flex-col w-full h-full items-start justify-center p-1">
              <Slider
                label="Select a budget"
                formatOptions={{ style: "currency", currency: "VND" }}
                step={5000}
                maxValue={300000}
                minValue={30000}
                defaultValue={[30000, 300000]}
                value={filterValue}
                onChange={handleOnChangeValueSlider}
              />
            </div>
          </div>

          {/* FILTER BY RATE */}
          <div className='p-3 mt-3'>
            <RadioGroup
              value={selectedRating}
              onChange={(e) => handleRadioChange(e.target.value)}
            >
              <Radio value="0"> Any Rating</Radio>
              <Radio value="4" className="radio-btn"><StarIcon size={15} value={4} /> & Up</Radio>
              <Radio value="3" className="radio-btn"><StarIcon size={15} value={3} /> & Up</Radio>
              <Radio value="2" className="radio-btn"><StarIcon size={15} value={2} /> & Up</Radio>
            </RadioGroup>
          </div>
          <div className='p-2 flex justify-center'>
            <Button color='primary' radius='full' className='h-[30px]' onClick={handleApplyFilters}>
              Apply Filter
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SideBarFilter