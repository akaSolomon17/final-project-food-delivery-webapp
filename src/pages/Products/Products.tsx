import React, { Key, SetStateAction, useEffect, useState } from 'react'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { Banner } from '../../components/Banner/Banner';
import { Food } from '../../types/foods.type';
import { useGetFoodList } from '../../apis/products/getFoodList.api';
import { useLoadMoreFetch } from '../../apis/loadMoreFetch.api';
import AllProduct from '../../components/Products/AllProducts';
import Recommended from '../../components/Products/Recommended';
import BestSeller from '../../components/Products/BestSeller';
import { useSearchParams } from 'react-router-dom';

const Products = () => {
  // GET FOOD LIST
  const { data: foodList, isLoading, isError } = useGetFoodList()

  // GET FOOD LIST LOAD MORE BY PAGE
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Food[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string>("Newest")

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValue, setFilterValue] = useState([30000, 300000]);
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<string[]>([]);
  console.log("🚀 ~ selectedCheckboxes:", selectedCheckboxes);
  const [selectedRating, setSelectedRating] = useState('0');

  // SEARCH PARAM
  useEffect(() => {
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const categories = searchParams.get('categories');
    const rating = searchParams.get('rating');

    if (priceMin && priceMax) {
      setFilterValue([Number(priceMin), Number(priceMax)]);
    }

    if (categories) {
      setSelectedCheckboxes(categories.split(','));
    }

    if (rating) {
      setSelectedRating(rating);
    }
  }, [searchParams]);
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").split("_").join(" "),
    [selectedKeys]
  );

  const { data: fetchFilterSort, totalPages, isLoading: isLoadingLoadMore, refetch } = useLoadMoreFetch(
    'foodList',
    page,
    4,
    true,
    selectedValue === "Newest" || selectedValue === "Oldest" ? 'id' : 'avgRate',
    selectedValue === 'Newest' || selectedValue === 'RatingUp' ? 'desc' : 'asc',
    filterValue[0],
    filterValue[1],
    selectedCheckboxes,
    Number(selectedRating))
  console.log("🚀 ~ fetchFilterSort:", fetchFilterSort);

  useEffect(() => {
    if (fetchFilterSort) {
      setData((prevData) => {
        if (page === 1) {
          return fetchFilterSort;
        }
        const newData = fetchFilterSort.filter((item: Food) => !prevData.some(prevItem => prevItem.id === item.id));
        return [...prevData, ...newData];
      });
    }
  }, [page, fetchFilterSort])

  useEffect(() => {
    refetch()
    setPage(1);
  }, [refetch, selectedValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading food list.</div>;
  }

  const handleSelectionChange = (keys: Selection | string | Set<Key>) => {
    setSelectedKeys(keys as SetStateAction<string>);
  }

  return (
    <div className='flex flex-col gap-12'>
      <div className='flex justify-center mt-10'>
        <div className="flex gap-16">
          <SearchBar />
        </div>
      </div>
      <Banner />
      {/* RECOMMENDED */}
      <Recommended foodList={foodList} isLoading={isLoading} isError={isError} />
      {/* BEST SELLER */}
      <BestSeller foodList={foodList} isLoading={isLoading} isError={isError} />
      {/* ALL PRODUCT */}
      <AllProduct
        foodData={data}
        isLoading={isLoading}
        isError={isError}
        selectedValue={selectedValue}
        selectedKeys={selectedKeys}
        handleSelectionChange={handleSelectionChange}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        isLoadingLoadMore={isLoadingLoadMore}
      />
    </div>
  )
}

export default Products