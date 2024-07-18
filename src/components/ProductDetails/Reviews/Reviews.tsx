import React from "react";
import AddReview from "./AddReview";
import SortBy from "./SortBy";
import Comments from "./Comments";
import { IReviews } from "../../../types/review.type";

const Reviews: React.FC<IReviews> = ({
  selectedValue,
  isLoading,
  totalPages,
}) => {
  return (
    <div>
      <AddReview />
      <div className="comment max-w-[473px] ms-[20rem] flex flex-col gap-8 mt-10">
        <SortBy selectedValue={selectedValue} />
        <Comments isLoading={isLoading} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Reviews;
