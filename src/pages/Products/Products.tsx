import React, { SetStateAction, useEffect, useState } from 'react'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { Banner } from '../../components/Banner/Banner';

import { BsCartPlus } from "react-icons/bs";

import { Button, Card, CardBody, CardFooter, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import LoadMore from '../../components/LoadMore/LoadMore';
import SwiperCustom from '../../components/Swiper/SwiperCustom';
import { Food } from '../../types/foods.type';
import { useGetFoodList } from '../../apis/products/getFoodList.api';
import { useLoadMoreFetch } from '../../apis/loadMoreFetch.api';
import { IoIosArrowDropdown } from 'react-icons/io';

const Products = () => {
  const navigate = useNavigate();

  // GET FOOD LIST
  const { data: foodList, isLoading, isError } = useGetFoodList()

  // GET FOOD LIST LOAD MORE BY PAGE
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Food[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string>("Newest")

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").split("_").join(" "),
    [selectedKeys]
  );

  // GET FOOD LIST LOAD MORE BY PAGE and SORT ORDER
  const { data: foodLoadMore, totalPages, isLoading: isLoadingLoadMore, refetch } = useLoadMoreFetch(
    'foodList',
    page,
    4,
    selectedValue === "Newest" || selectedValue === "Oldest" ? 'id' : 'avgRate',
    selectedValue === 'Newest' || selectedValue === 'RatingUp' ? 'desc' : 'asc'
  )

  useEffect(() => {
    if (foodLoadMore) {
      setData((prevData) => {
        if (page === 1) {
          return foodLoadMore;
        }
        const newData = foodLoadMore.filter((item: Food) => !prevData.some(prevItem => prevItem.id === item.id));
        return [...prevData, ...newData];
      });
    }
  }, [page, foodLoadMore])

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

  const handleSelectionChange = (keys: Selection | string) => {
    setSelectedKeys(keys);
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
      <div className="recommended">
        <SwiperCustom slidePerView={4} className='w-[83rem] h-full flex flex-col' isPagination={false} headerContent='Recommended' isBanner={false}>
          {foodList?.data?.map((item: Food) => (
            <Card shadow="sm" className=" max-h-[27rem] min-w-[19rem] max-w-[19rem]" key={item.id} isPressable onPress={() => navigate(`/product-details/${item.id}`)}>
              <CardBody className="overflow-visible p-0 h-[15rem] max-h-[420px]">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[15rem] select-none"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="flex flex-col max-w-[30rem] items-start ">
                <div className="text-small flex  flex-col self-start text-left max-w-[25rem] h-[80px] max-h-[100px]">
                  <b>{item.title}</b>
                  <b className="font-normal max-w-[20rem]">{item.description}</b>
                </div>
                <p className="border-black text-default-700 text-right w-full">{item.price}₫</p>
                <Chip className="bg-black text-white self-end mt-[0.5rem]">
                  <BsCartPlus className='size-4' />
                </Chip>
              </CardFooter>
            </Card>
          ))}
        </SwiperCustom>
      </div>
      {/* BEST SELLER */}
      <div className="best-seller">
        <SwiperCustom slidePerView={4} className='w-[83rem] h-full flex flex-col' isPagination={false} headerContent='Best Seller' isBanner={false}>
          {foodList?.data?.map((item: Food) => (
            <Card shadow="sm" className=" max-h-[27rem] min-w-[19rem] max-w-[19rem]" key={item.id} isPressable onPress={() => navigate(`/product-details/${item.id}`)}>
              <CardBody className="overflow-visible p-0 h-[15rem] max-h-[420px]">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[15rem] select-none"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="flex flex-col max-w-[30rem] items-start ">
                <div className="text-small flex  flex-col self-start text-left max-w-[25rem] h-[80px] max-h-[100px]">
                  <b>{item.title}</b>
                  <b className="font-normal max-w-[20rem]">{item.description}</b>
                </div>
                <p className="border-black text-default-700 text-right w-full">{item.price}₫</p>
                <Chip className="bg-black text-white self-end mt-[0.5rem]">
                  <BsCartPlus className='size-4' />
                </Chip>
              </CardFooter>
            </Card>
          ))}
        </SwiperCustom>
      </div>
      {/* ALL PRODUCT */}
      <div className="all-products flex flex-col items-center">
        <div className="flex flex-row justify-evenly gap-x-[64rem] items-center">
          <h1 className='font-sans font-bold text-4xl select-none'>All Product</h1>
          <div className="dropdown">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" endContent={<IoIosArrowDropdown color='#777E90' size={20} />} disableAnimation>
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange}
              >
                <DropdownItem key="Newest" textValue='Newest'>Newest</DropdownItem>
                <DropdownItem key="Oldest" textValue='Oldest'>Oldest</DropdownItem>
                <DropdownItem key="RatingUp" textValue='RatingUp'>Rating Up</DropdownItem>
                <DropdownItem key="RatingDown" textValue='RatingDown'>Rating Down</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex flex-rows gap-9 flex-wrap justify-center mt-[4rem] max-w-[96rem]">
          {data?.map((item: Food, index: number) => (
            <Card shadow="sm" className=" max-h-[27rem] min-w-[19rem] max-w-[19rem] items-start" key={index} isPressable onPressEnd={() => { navigate(`/product-details/${item.id}`) }}>
              <CardBody className="overflow-visible p-0 h-[15rem] max-h-[420px]">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[15rem] select-none"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="flex flex-col max-w-[30rem] items-start ">
                <div className="text-small flex  flex-col self-start text-left max-w-[25rem] h-[80px] max-h-[100px]">
                  <b>{item.title}</b>
                  <b className="font-normal max-w-[20rem]">{item.description}</b>
                </div>
                <p className="border-black text-default-700 text-right w-full">{item.price}₫</p>
                <Chip className="bg-black text-white self-end mt-[0.5rem]">
                  <BsCartPlus className='size-4' />
                </Chip>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      {totalPages && page < totalPages && (
        <LoadMore content={isLoadingLoadMore ? 'Loading...' : 'Load more foods'} clickEvent={() => setPage(page + 1)} />
      )}
    </div>
  )
}

export default Products