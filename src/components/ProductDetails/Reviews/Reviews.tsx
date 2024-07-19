import React from "react";
import AddReview from "./AddReview";
import SortBy from "./SortBy";
import Comments from "./Comments";

const Reviews = () => {
  return (
    <div>
      <AddReview />
      <div className="comment max-w-[473px] ms-[20rem] flex flex-col gap-8 mt-10">
        <SortBy />
        <Comments />
      </div>
    </div>
  );
};

export default Reviews;
