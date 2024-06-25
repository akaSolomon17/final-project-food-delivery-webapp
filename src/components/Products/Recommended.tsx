import React from 'react'
import SwiperCustom from '../Swiper/SwiperCustom'
import { Card, CardBody, CardFooter, Chip, Image } from '@nextui-org/react'
import { BsCartPlus } from 'react-icons/bs'
import { Food } from '../../types/foods.type'
import { useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'

const Recommended: React.FC<{ foodList: AxiosResponse | undefined, isLoading: boolean, isError: boolean }> = ({ foodList, isLoading, isError }) => {
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading food list.</div>;
    }
    return (
        <div>
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
    )
}

export default Recommended