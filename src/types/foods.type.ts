export interface Food {
  id: string | null;
  title: string;
  price?: string | null;
  priceNumber: number;
  img: string | FileList | File | null;
  description?: string | null;
  category: string;
  avgRate: number;
  isExclusive: string;
}

export interface FoodPaginate {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Food[];
}

export interface FoodCategory {
  id: string;
  name: string;
  img: string;
}

export interface FoodCreate {
  id?: string | null;
  title: string;
  price: string | null;
  img?: string | FileList | File | null;
  priceNumber?: number | null;
  description: string | null;
  category: string;
  avgRate?: number | null;
  isExclusive?: string | null;
}

export interface IActiveSearch {
  id: string;
  title: string;
  img: string;
}

export interface IProductItemProps {
  item: Food;
  index: number;
}

export type FoodFormValues = Pick<
  Food,
  "title" | "price" | "priceNumber" | "description" | "category" | "img"
>;

export type FoodUpdate = Omit<
  FoodCreate,
  "price" | "img" | "avgRate" | "isExclusive" | "voucherCode"
> & {
  img?: string | FileList | File;
};

export type Foods = Omit<Food, "categoryId" | "isExclusive" | "avgRating">;
