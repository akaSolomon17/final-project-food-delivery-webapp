import {
  useDataFeedbacks,
  usePage,
  useReviewsActions,
} from "../../../zustand/reviewsStore.ts";
import { FC } from "react";
import { Feedback } from "../../../types/feedbacks.type";
import { Avatar } from "@nextui-org/react";
import LoadMore from "../../LoadMore/LoadMore";
import { StarIcon } from "../../StarRating/Star";
import { ICommentsProps } from "../../../types/review.type.ts";

const Comments: FC<ICommentsProps> = ({ isLoading, totalPages }) => {
  const feedBacksData = useDataFeedbacks();
  const { setPage } = useReviewsActions();
  const page = usePage();

  return (
    <>
      {feedBacksData.map((item: Feedback, index: number) => (
        <div className="comments flex justify-evenly pb-7 border-b" key={index}>
          <div>
            <Avatar src={item.avatar} />
          </div>
          <div className="min-w-[405px] gap-3">
            <div className="flex justify-between ">
              <h1 className="text-xl font-bold">{item.name}</h1>
              <StarIcon size={16} value={item.reviews?.[0].rate as number} />
            </div>
            <p className="text-lg">{item.reviews?.[0].comment}</p>
            <div className="font-lato flex gap-3">
              <h3 className="font-normal text-[#777E90]">about 1 hour ago</h3>
              <h2 className="font-semibold">Like</h2>
              <h2 className="font-semibold">Reply</h2>
            </div>
          </div>
        </div>
      ))}
      {totalPages && page < totalPages && (
        <LoadMore
          content={isLoading ? "Loading..." : "Load more comments"}
          clickEvent={() => setPage(page + 1)}
        />
      )}
    </>
  );
};

export default Comments;
