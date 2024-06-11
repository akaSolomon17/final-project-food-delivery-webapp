import React from 'react'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { Banner } from '../../components/Banner/Banner';

import { BsCartPlus } from "react-icons/bs";

import { Card, CardBody, CardFooter, Chip, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import LoadMore from '../../components/LoadMore/LoadMore';
import SwiperCustom from '../../components/Swiper/SwiperCustom';

const list = [
  {
    id: 1,
    title: "Kimbap Heo Galbi",
    img: "/foods/kimbap-bo.jpg",
    price: "65.000",
    description: "Sản phẩm được đựng trong hộp giấy xinh xắn."
  },
  {
    id: 2,
    title: "Kimbap bò cay sốt BBQ",
    img: "/foods/kimbap-cay.jpg",
    price: "65.000",
    description: `BEST SELLER - Kimbap với nhân Thịt bò ba chỉ Mỹ thấm ướp gia vị kèm sốt BBQ thơm cay. Sản phẩm được đựng vào hộp giấy xinh xắn.`
  },
  {
    id: 3,
    title: "Kimbap Phô Mai",
    img: "/foods/kimbap-phomai.jpg",
    price: "65.000",
    description: "Sản phẩm được đựng vào hộp giấy xinh xắn."
  },
  {
    id: 4,
    title: "Kimbap Phô Mai",
    img: "/foods/kimbap-phomai.jpg",
    price: "65.000",
    description: "Sản phẩm được đựng vào hộp giấy xinh xắn."
  },
  {
    id: 5,
    title: "Kimbap Phô Mai",
    img: "/foods/kimbap-phomai.jpg",
    price: "65.000",
    description: "Sản phẩm được đựng vào hộp giấy xinh xắn."
  },
  {
    id: 6,
    title: "Kimbap Phô Mai",
    img: "/foods/kimbap-phomai.jpg",
    price: "65.000",
    description: "Sản phẩm được đựng vào hộp giấy xinh xắn."
  },
  {
    id: 5,
    title: "Kimbap Phô Mai",
    img: "/foods/kimbap-phomai.jpg",
    price: "65.000",
    description: "Sản phẩm được đựng vào hộp giấy xinh xắn."
  },
  {
    id: 7,
    title: "Kimbap Phô Mai",
    img: "/foods/kimbap-phomai.jpg",
    price: "65.000",
    description: "Sản phẩm được đựng vào hộp giấy xinh xắn."
  },
  {
    id: 8,
    title: "Kimbap Phô Mai",
    img: "/foods/kimbap-phomai.jpg",
    price: "65.000",
    description: "Sản phẩm được đựng vào hộp giấy xinh xắn."
  },
  {
    id: 9,
    title: "Kimbap Phô Mai",
    img: "/foods/kimbap-phomai.jpg",
    price: "65.000",
    description: "Sản phẩm được đựng vào hộp giấy xinh xắn."
  }
];

const Products = () => {
  const navigate = useNavigate();

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
        <SwiperCustom slidePerView={4} className='w-[83rem] h-full mySwiper' isPagination={false} headerContent='Recommended' isBanner={false}>
          {list.map((item, index) => (
            <Card shadow="sm" className=" max-h-[27rem] min-w-[19rem] max-w-[19rem]" key={index} isPressable onPress={() => navigate('/product-details')}>
              <CardBody className="overflow-visible p-0 h-[15rem] max-h-[420px]">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[15rem]"
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
        <SwiperCustom slidePerView={4} className='w-[83rem] h-full mySwiper' isPagination={false} headerContent='Best Seller' isBanner={false}>
          {list.map((item, index) => (
            <Card shadow="sm" className=" max-h-[27rem] min-w-[19rem] max-w-[19rem]" key={index} isPressable onPress={() => navigate('/product-details')}>
              <CardBody className="overflow-visible p-0 h-[15rem] max-h-[420px]">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[15rem]"
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
        <div className="flex flex-row justify-evenly gap-x-[66rem] items-center">
          <h1 className='font-sans font-bold text-4xl'>All Product</h1>
        </div>
        <div className="flex flex-rows gap-9 flex-wrap justify-center mt-[4rem] max-w-[96rem]">
          {list.map((item, index) => (
            <Card shadow="sm" className=" max-h-[27rem] min-w-[19rem] max-w-[19rem] items-start" key={index} isPressable onPressEnd={() => { navigate("/product-details") }}>
              <CardBody className="overflow-visible p-0 h-[15rem] max-h-[420px]">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[15rem]"
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
      {/* Load more, if the row are 3 then show button 
      if click isLoading = true and show 3 more row
      */}
      <LoadMore content='Load more 100+' />
    </div>
  )
}

export default Products