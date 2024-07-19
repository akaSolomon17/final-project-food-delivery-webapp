import {
  CheckboxGroupProps,
  RadioGroupProps,
  SliderProps,
} from "@nextui-org/react";
import { EFilterSort } from "./enums.type";

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

export interface IFilterSidebarFormProps {
  priceMin: number;
  priceMax: number;
  priceRange: number | number[];
  categories: string[];
  rating: EFilterSort;
  sortBy: EFilterSort;
}

export interface FoodFilterProps {
  sort: string;
  order: string;
  priceMin: number;
  priceMax: number;
  categories?: string[] | undefined | null;
  rating?: number | null;
}
