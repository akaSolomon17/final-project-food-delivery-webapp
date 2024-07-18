import {
  CheckboxGroupProps,
  RadioGroupProps,
  SliderProps,
} from "@nextui-org/react";

export interface FilterValuesProps {
  filterValue?: number[];
  selectedCheckboxes?: string[];
  selectedRating: string;
}

export interface ICheckboxValidationProps extends CheckboxGroupProps {
  children: React.ReactNode | React.ReactNode[];
  name: string;
}

export interface ISliderValidationProps extends SliderProps {
  name: string;
}

export interface IRadioValidationProps extends RadioGroupProps {
  name: string;
  children: React.ReactNode | React.ReactNode[];
}

export interface ISortByProps {
  selectedValue: string;
}

export interface IFilterSidebarFormProps {
  priceMin: number;
  priceMax: number;
  priceRange: number | number[];
  categories: string[];
  rating: string;
  sortBy: string;
}

export interface FoodFilterProps {
  sort: string;
  order: string;
  priceMin: number;
  priceMax: number;
  categories?: string[] | undefined | null;
  rating?: number | null;
}
