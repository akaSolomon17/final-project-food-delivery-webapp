import { useEffect } from "react";
import { Radio, Checkbox, Button } from "@nextui-org/react";
import { IoRemoveOutline } from "react-icons/io5";
import { StarIcon } from "../StarRating/Star";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { useGetFoodCategories } from "../../apis/products/getFoodCategories.api";
import { FoodCategory } from "../../types/foods.type";
import { FormProvider, useForm } from "react-hook-form";
import { IFilterSidebarFormProps } from "../../types/filters.type";
import { useGetFoodFiltered } from "../../apis/products/getFoodFiltered.api";
import { EFilterSearchParams } from "../../types/enums.type";

import CheckboxValidation from "../CheckboxValidation/CheckboxValidation";
import InputValidation from "../InputValidation/InputValidation";
import SliderValidation from "../SliderValidation/SliderValidation";
import RadioValidation from "../RadioValidation/RadioValidation";
import "./ProductFilter.css";

const { PRICE_MIN, PRICE_MAX, CATEGORIES } = EFilterSearchParams;

const numberFields = [PRICE_MIN, PRICE_MAX];

const sidebarFilterDefaultValues: IFilterSidebarFormProps = {
  priceMin: 30000,
  priceMax: 300000,
  priceRange: [30000, 300000],
  categories: [],
  rating: "",
  sortBy: "newest",
};

const ProductFilter = () => {
  const methods = useForm<IFilterSidebarFormProps>({
    defaultValues: sidebarFilterDefaultValues,
  });

  const { handleSubmit, setValue, reset } = methods;
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading } = useGetFoodFiltered();
  const { data: foodCategories } = useGetFoodCategories();
  const foodCategoriesList = foodCategories?.data;

  // setValue from searchParam when reload
  useEffect(() => {
    const categories = searchParams.get(CATEGORIES);
    categories && setValue(CATEGORIES, categories.split(","));

    numberFields.map((field) => {
      const value = searchParams.get(field);
      if (value) {
        setValue(field as EFilterSearchParams, Number(value));
      }
    });

    // exclude number fields and set value for the rest
    searchParams.forEach((value, key) => {
      if (!numberFields.includes(key as EFilterSearchParams)) {
        setValue(key as EFilterSearchParams, value);
      }
    });
  }, []);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue(PRICE_MIN, value[0]);
      setValue(PRICE_MAX, value[1]);
      setValue("priceRange", value);
    }
  };

  const handleApplyFilters = (data: IFilterSidebarFormProps) => {
    const { priceMin, priceMax, categories, rating, sortBy } = data;

    searchParams.set(PRICE_MIN, String(priceMin));
    searchParams.set(PRICE_MAX, String(priceMax));
    searchParams.set("sortBy", sortBy);

    categories.length > 0
      ? searchParams.set("categories", categories.join(","))
      : searchParams.delete("categories");

    rating !== ""
      ? searchParams.set("rating", rating)
      : searchParams.delete("rating");

    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    reset();
    setSearchParams({});
  };

  return (
    <div className="fixed z-40 flex flex-col h-full items-center">
      <SearchBar />
      <div className="flex cursor-pointer mt-3">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleApplyFilters)}
            className="overflow-hidden flex flex-col justify-center border rounded-md shadow-lg bg-white h-[800px] w-[235px]"
          >
            {/* FILTER CATEGORY */}
            <CheckboxValidation name="categories" className="p-2">
              {foodCategoriesList?.map(
                (category: FoodCategory, index: number) => (
                  <Checkbox key={index} value={category.name} radius="none">
                    {category.name}
                  </Checkbox>
                ),
              )}
            </CheckboxValidation>

            {/* FILTER PRICE */}
            <div className="flex flex-row items-center justify-between">
              <InputValidation
                name={PRICE_MIN}
                radius="sm"
                type="number"
                className="max-w-[10rem] w-[100px]"
                endContent="₫"
              />
              <IoRemoveOutline />
              <InputValidation
                name={PRICE_MAX}
                radius="sm"
                type="number"
                className="max-w-[10rem] w-[100px]"
                endContent="₫"
              />
            </div>

            {/* SLIDER PRICE*/}
            <div className="flex flex-col w-full items-start justify-center p-1">
              <SliderValidation
                name="priceRange"
                label="Select a budget"
                className="h-[50px]"
                formatOptions={{ style: "currency", currency: "VND" }}
                step={5000}
                maxValue={300000}
                minValue={30000}
                defaultValue={[30000, 300000]}
                onChange={handleSliderChange}
              />
            </div>

            {/* FILTER BY RATE */}
            <div className="p-3">
              <RadioValidation name="rating">
                <Radio value="">Any Rating</Radio>
                <Radio value="4" className="radio-btn">
                  <StarIcon size={15} value={4} /> & Up
                </Radio>
                <Radio value="3" className="radio-btn">
                  <StarIcon size={15} value={3} /> & Up
                </Radio>
                <Radio value="2" className="radio-btn">
                  <StarIcon size={15} value={2} /> & Up
                </Radio>
              </RadioValidation>
            </div>
            <div className="p-3">
              <RadioValidation name="sortBy">
                <Radio value="newest" className="radio-btn">
                  Newest
                </Radio>
                <Radio value="oldest" className="radio-btn">
                  Oldest
                </Radio>
                <Radio value="ratingUp" className="radio-btn">
                  Rating Up
                </Radio>
                <Radio value="ratingDown" className="radio-btn">
                  Rating Down
                </Radio>
              </RadioValidation>
            </div>

            {/* APPLY FILTER */}
            <div className="p-2 flex justify-center gap-2">
              <Button
                color="primary"
                radius="sm"
                type="submit"
                className={
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed h-[30px]"
                    : "h-[30px]"
                }
                disabled={isLoading}
              >
                Apply Filter
              </Button>
              <Button
                color="default"
                radius="sm"
                className="h-[30px]"
                onClick={handleResetFilters}
              >
                Reset
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProductFilter;
