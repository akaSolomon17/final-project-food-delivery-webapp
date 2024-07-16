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
import CheckboxValidation from "../CheckboxValidation/CheckboxValidation";
import InputValidation from "../InputValidation/InputValidation";
import SliderValidation from "../SliderValidation/SliderValidation";
import RadioValidation from "../RadioValidation/RadioValidation";
import "./SidebarFilter.css";
import { useGetFoodFiltered } from "../../apis/products/getFoodFiltered.api";

const sidebarFilterDefaultValues: IFilterSidebarFormProps = {
  priceMin: 30000,
  priceMax: 300000,
  priceRange: [30000, 300000],
  categories: [],
  rating: "",
  sortBy: "newest",
};

const SideBarFilter = () => {
  const methods = useForm<IFilterSidebarFormProps>({
    defaultValues: sidebarFilterDefaultValues,
  });

  const { handleSubmit, setValue, watch, reset } = methods;
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: foodCategories } = useGetFoodCategories();
  const foodCategoriesList = foodCategories?.data;

  const { isLoading } = useGetFoodFiltered();

  const filterValue = watch(["priceMin", "priceMax"]);
  const selectedCheckboxes = watch("categories");
  const selectedRating = watch("rating");
  const selectSortBy = watch("sortBy");

  // setValue from searchParam when reload
  useEffect(() => {
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const categories = searchParams.get("categories");
    const rating = searchParams.get("rating");
    const sortBy = searchParams.get("sortBy");

    if (priceMin && priceMax) {
      setValue("priceMin", Number(priceMin));
      setValue("priceMax", Number(priceMax));
      setValue("priceRange", [Number(priceMin), Number(priceMax)]);
    }
    if (categories) {
      setValue("categories", categories.split(","));
    }
    if (rating) {
      setValue("rating", rating);
    }
    if (sortBy) {
      setValue("sortBy", sortBy);
    }
  }, [searchParams, setValue]);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue("priceMin", value[0]);
      setValue("priceMax", value[1]);
      setValue("priceRange", value);
    }
  };

  const handleApplyFilters = (data: IFilterSidebarFormProps) => {
    console.log("data: ", data);

    searchParams.set("priceMin", String(filterValue[0]));
    searchParams.set("priceMax", String(filterValue[1]));
    searchParams.set("sortBy", selectSortBy);
    selectedCheckboxes.length > 0
      ? searchParams.set("categories", selectedCheckboxes.join(","))
      : searchParams.delete("categories");

    selectedRating !== ""
      ? searchParams.set("rating", selectedRating)
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
            <CheckboxValidation
              name="categories"
              className="p-2"
              value={selectedCheckboxes}
            >
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
                name="priceMin"
                radius="sm"
                type="number"
                value={`${filterValue[0]}`}
                className="max-w-[10rem] w-[100px]"
                endContent="₫"
              />
              <IoRemoveOutline />
              <InputValidation
                name="priceMax"
                radius="sm"
                type="number"
                value={`${filterValue[1]}`}
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
                value={filterValue}
                onChange={handleSliderChange}
              />
            </div>

            {/* FILTER BY RATE */}
            <div className="p-3">
              <RadioValidation name="rating" value={selectedRating}>
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
              <RadioValidation name="sortBy" value={selectSortBy}>
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

export default SideBarFilter;
