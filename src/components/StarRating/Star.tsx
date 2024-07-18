import { FC, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { IStarProps } from "../../types/review.type";
import "./Star.css";

const fillColorArray = [
  "#f17a45",
  "#f17a45",
  "#f19745",
  "#f19745",
  "#f1a545",
  "#f1a545",
  "#f1b345",
  "#f1b345",
  "#f1d045",
  "#f1d045",
];

export const StarIcon: FC<IStarProps> = ({ size = 24, value = -1 }) => {
  const [, setRating] = useState(0);

  const handleRating = (rate: number) => setRating(rate);

  let readonly = false;
  if (value > 5 || value < 0) {
    value = 0;
    readonly = false;
  } else {
    readonly = true;
  }

  return (
    <div>
      <Rating
        onClick={handleRating}
        size={size}
        transition
        allowFraction
        fillColorArray={fillColorArray}
        readonly={readonly}
        initialValue={value}
      />
    </div>
  );
};
