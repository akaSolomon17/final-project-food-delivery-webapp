export interface Food {
    id: string,
    title: string,
    price: string,
    img: string,
    description: string,
    category: string,
    avgRating: number, //calc by user rating
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

export type Foods = Omit<Food,'categoryId'|'isExclusive'|'avgRating'>