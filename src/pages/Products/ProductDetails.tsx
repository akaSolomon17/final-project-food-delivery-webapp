import React, { useCallback, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useGetFoodById } from '../../apis/products/getFoodById.api';
import { useGetFoodListRecommended } from '../../apis/products/getFoodListRecommended.api';
import { Food } from '../../types/foods.type';
import { useLoadMoreFetch } from '../../apis/loadMoreFetch.api';
import AlsoLike from '../../components/ProductDetails/AlsoLike';
import Reviews from '../../components/ProductDetails/Reviews/Reviews';
import ProductContent from '../../components/ProductDetails/ProductContent';
import { useDataFeedbacks, usePage, useReviewsActions, useSelectedKeys } from '../../zustand/reviewsStore.ts';
import { Feedback } from '../../types/feedbacks.type';
import useSelectedValue from '../../utils/reformatSelection.ts';
import { EFilterSort } from '../../types/enums.type.ts';

const foodInitialData = {
    id: "1",
    avgRate: 1,
    categoryId: "",
    description: "Description is not available!",
    img: "https://res.cloudinary.com/dooge27kv/image/upload/v1718340358/Error/unavailable-image_ndp6qa.jpg",
    isExclusive: "false",
    price: "NaN",
    title: "Title is not available!"
}

const ProductDetails = () => {
    const { NEWEST, DESC, ACS, COMMENT_LIMIT, USER_REVIEW, ID } = EFilterSort
    const page = usePage()
    const selectedKeys = useSelectedKeys()
    const dataFeedbacks = useDataFeedbacks()
    const selectedValue = useSelectedValue(selectedKeys)
    const { setDataFeedbacks } = useReviewsActions()
    const { setPage } = useReviewsActions()
    const { productId } = useParams();
    const { foodId, isLoading: foodLoading } = useGetFoodById(productId || "0")
    const foodIdData = foodId?.data || foodInitialData

    const { recommendedResult } = useGetFoodListRecommended(foodIdData.category, foodIdData.id)
    const foodListRecommended = recommendedResult?.data || []

    const {
        data: commentLoadMore,
        totalPages,
        isLoading,
        refetch
    } = useLoadMoreFetch(
        USER_REVIEW,
        page,
        COMMENT_LIMIT,
        false,
        ID,
        selectedValue === NEWEST ? DESC : ACS
    )

    const updateDataFeedbacks = useCallback((prevData: Feedback[]): Feedback[] => {
        if (page === 1) {
            return commentLoadMore;
        }
        const newData = commentLoadMore.filter((item: Food) => !prevData.some(prevItem => prevItem.id === item.id));
        return [...prevData, ...newData];
    }, [commentLoadMore, page]);

    useEffect(() => {
        if (commentLoadMore) {
            setDataFeedbacks(updateDataFeedbacks(dataFeedbacks))
        }
    }, [commentLoadMore, updateDataFeedbacks, setDataFeedbacks])

    useEffect(() => {
        refetch()
        setPage(1); // Reset page về 1 khi thay đổi sắp xếp
    }, [refetch, selectedValue, setPage]);

    return (
        <div className='flex flex-col gap-20 mt-20'>
            <ProductContent foodIdData={foodIdData} foodLoading={foodLoading}/>
            <Reviews
                selectedValue={selectedValue}
                isLoading={isLoading}
                totalPages={totalPages} />
            <AlsoLike foodListRecommended={foodListRecommended} />
        </div>
    )
}

export default ProductDetails