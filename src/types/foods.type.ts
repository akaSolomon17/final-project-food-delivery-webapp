export interface Food {
    id: string | undefined | null ,
    title: string,
    price: string,
    priceNumber: number,
    img: string | undefined,
    description?: string,
    category: string,
    avgRate: number, //calc by user rating
    isExclusive: string
}

export interface FoodPaginate {
    first: number,
    prev: number | null,
    next: number | null,
    last: number,
    pages: number,
    items: number,
    data: Food[]
}

export interface FoodCategory {
    id: string,
    name: string,
    img: string
}

export interface FoodCreate {
    id?: string | null,
    title: string,
    price?: string | null,
    img: FileList,
    priceNumber: number ,
    description?: string,
    category: string,
    avgRate?: number | null, //calc by user rating
    isExclusive?: string | null
}

export type FoodUpdate = Omit<FoodCreate,'price'|'img'| 'avgRate' | 'isExclusive'>


export type Foods = Omit<Food,'categoryId'|'isExclusive'|'avgRating'>

