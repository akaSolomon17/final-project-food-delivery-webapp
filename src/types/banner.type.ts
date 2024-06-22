export interface Banner {
    id:string,
    alt: string,
    img: string,
}

export type Banners = Omit<Banner,'id'>