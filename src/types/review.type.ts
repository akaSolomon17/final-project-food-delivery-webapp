export interface IReviews {
  selectedValue: string;
  isLoading: boolean;
  totalPages: number | undefined;
}

export interface ICommentsProps {
  isLoading: boolean;
  totalPages: number | undefined;
}

export interface IStarProps {
  size?: number;
  value?: number;
}
