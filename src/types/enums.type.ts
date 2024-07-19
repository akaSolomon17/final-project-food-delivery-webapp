export enum EFilterSort {
  USER_REVIEW = "userReview",
  FOOD_LIST = "foodList",
  COMMENT_LIMIT = 2,
  NEWEST = "newest",
  OLDEST = "oldest",
  RATING_UP = "ratingUp",
  RATING_DOWN = "ratingDown",
  DESC = "desc",
  ACS = "asc",
  ID = "id",
  AVG_RATE = "avgRate",
  PRICE_MIN = 30000,
  PRICE_MAX = 300000,
  DEFAULT_RATING = "",
}

export enum EFood {
  DEFAULT_IS_EXCLUSIVES = "Không",
}

export enum EStatusCRUD {
  CRUD_SUCCESS = "success",
  CRUD_ERROR = "error",
  CRUD_WARNING = "warning",
  CRUD_INFO = "info",
}

export enum EToastifyStatus {
  TOAST_INFO = "info",
  TOAST_SUCCESS = "success",
  TOAST_WARNING = "warning",
  TOAST_ERROR = "error",
}

export enum EOrderHeaderColumn {
  ORDER_ID = "Order ID",
  ORDER_DATE = "Order Date",
  TOTAL_PRICE = "Total Price",
  STATUS = "Status",
}

export enum EOrderStatus {
  COMPLETED = "Completed",
  DELIVERING = "Delivering",
  CANCELED = "Canceled",
  ALL = "All",
}

export enum EDateRangeDefaultValue {
  START_DATE = "2024-01-01",
}

export enum EVoucher {
  VOUCHER_INVALID = '"Mã giảm giá không hợp lệ!"',
}

export enum ECartOrder {
  MAX_QUANTITY_PER_BILL = 99,
}

export enum EFilterSearchParams {
  PRICE_MIN = "priceMin",
  PRICE_MAX = "priceMax",
  CATEGORIES = "categories",
  RATING = "rating",
  SORT_BY = "sortBy",
  PRICE_RANGE = "priceRange",
}
