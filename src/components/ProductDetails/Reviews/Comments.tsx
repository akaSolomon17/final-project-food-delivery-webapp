/* eslint-disable react-hooks/exhaustive-deps */
import {
  useDataFeedbacks,
  usePage,
  useReviewsActions,
  useSelectedKeys,
} from "../../../zustand/reviewsStore.ts";
import { Avatar } from "@nextui-org/react";
import { useCallback, useEffect } from "react";
import { StarIcon } from "../../StarRating/Star";
import { Food } from "../../../types/foods.type.ts";
import { Feedback } from "../../../types/feedbacks.type";
import { useLoadMoreFetch } from "../../../apis/loadMoreFetch.api.ts";
import LoadMore from "../../LoadMore/LoadMore";
import useSelectedValue from "../../../utils/reformatSelection.ts";

const Comments = () => {
  const page = usePage();
  const selectedKeys = useSelectedKeys();
  const feedBacksData = useDataFeedbacks();
  const dataFeedbacks = useDataFeedbacks();
  const selectedValue = useSelectedValue(selectedKeys);
  const { setPage } = useReviewsActions();
  const { setDataFeedbacks } = useReviewsActions();
  const {
    data: commentLoadMore,
    totalPages,
    isLoading,
    refetch,
  } = useLoadMoreFetch();

  const updateDataFeedbacks = useCallback(
    (prevData: Feedback[]): Feedback[] => {
      if (page === 1) {
        return commentLoadMore;
      }
      const newData = commentLoadMore.filter(
        (item: Food) => !prevData.some((prevItem) => prevItem.id === item.id),
      );
      return [...prevData, ...newData];
    },
    [commentLoadMore, page],
  );

  useEffect(() => {
    if (commentLoadMore) {
      setDataFeedbacks(updateDataFeedbacks(dataFeedbacks));
    }
  }, [commentLoadMore, updateDataFeedbacks]);

  useEffect(() => {
    refetch();
    setPage(1);
  }, [refetch, selectedValue, setPage]);

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
