export interface Food {
    id?: string | undefined | null,
    title: string,
    price: string,
    priceNumber: number,
    img: string | undefined,
    description?: string,
    category: string,
    avgRate: number,
    isExclusive: string,
    voucherCode: string
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
    avgRate?: number | null,
    isExclusive?: string | null
}

export type FoodUpdate = Omit<FoodCreate,'price'|'img'| 'avgRate' | 'isExclusive'|'voucherCode'>


export type Foods = Omit<Food,'categoryId'|'isExclusive'|'avgRating'>

export type FoodHistory = Pick<Food,'id'|'title'|'priceNumber'>
