import { Banner } from "../components/Banner/Banner"
import { Card, CardBody, CardFooter, Image, Badge, Avatar, Chip } from "@nextui-org/react";

import SwiperCustom from "../components/Swiper/SwiperCustom";
import TestimonialsCards from "../components/Testimonials/TestimonialsCards";
import { useGetFoodList } from "../apis/getFoodList.api";
import { Foods } from "../types/foods.type";

// import { Swiper, SwiperSlide } from 'swiper/react';

const feedbacks = [
    {
        id: 1,
        username: "Zoey Lang",
        img: "https://nextui.org/avatars/avatar-1.png",
        description: "Frontend developer and UI/UX enthusiast. Join me on this coding adventure!"
    },
    {
        id: 2,
        username: "Cha Ji-Hun",
        img: "https://nextui.org/avatars/avatar-5.png",
        description: "Frontend developer and UI/UX enthusiast. Join me on this coding adventure!"
    },
    {
        id: 3,
        username: "Chan Canh-hub",
        img: "https://nextui.org/avatars/avatar-6.png",
        description: "Frontend developer and UI/UX enthusiast. Join me on this coding adventure!"
    },
    {
        id: 4,
        username: "Kim Jung-Woo",
        img: "https://nextui.org/avatars/avatar-7.png",
        description: "Frontend developer and UI/UX enthusiast. Join me on this coding adventure!"
    },
];



const Home: React.FC = () => {
    const { foodList } = useGetFoodList()
    const list = foodList?.data || []


    return (
        <div>
            <Banner />
            <div className="most-popular h-[300px] mt-9">
                <h3 className="text-center text-lg font-normal">Most Popular</h3>
                <h3 className="text-center text-2xl font-semibold mt-3">Our Exclusive Kimbap</h3>
                <div className="flex flex-rows justify-center mt-[4rem]">
                    {list.map((item: Foods, index: number) => (
                        <Card shadow="sm" className="mx-[30px] max-h-[750px]" key={index} isPressable onPress={() => console.log("item pressed")}>
                            <CardBody className="overflow-visible p-0 cardbody h-[420px] max-h-[420px]">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={item.title}
                                    className="w-full object-cover h-[400px]"
                                    src={item.img}
                                />
                            </CardBody>
                            <CardFooter className="flex flex-col max-w-[30rem] items-start p-3">
                                <div className="text-small flex  flex-col self-start text-left max-w-[25rem] h-[80px] max-h-[100px]">
                                    <b>{item.title}</b>
                                    <b className="font-normal max-w-[20rem]">{item.description}</b>
                                </div>
                                <p className="border-black text-default-700 text-right w-full">{item.price}₫</p>
                                <Chip className="bg-black text-white self-end mt-[0.5rem]">Order Now</Chip>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                {/* GET API FOOD TYPES */}
                <div className="main-services">
                    <h3 className="text-center text-lg font-normal mt-20">Main Service</h3>
                    <h3 className="text-center text-2xl font-semibold mt-3">Our Exclusive Cakes</h3>
                    <div className="flex gap-11 items-center justify-center mt-[2.5rem]">
                        <div className="flex flex-col items-center size-28">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="/foods/ga.jpg"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3 ">Gà</span>
                        </div>
                        <div className="flex flex-col items-center size-28">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="/foods/kimbap.jpg"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3">Kimbap</span>
                        </div>
                        <div className="flex flex-col items-center size-28">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="/foods/box-yummy.jpg"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3">Box Yummy</span>
                        </div>
                        <div className="flex flex-col items-center size-28">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="/foods/myhq.jpg"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3">Mỳ Hàn Quốc</span>
                        </div>
                        <div className="flex flex-col items-center size-28">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="/foods/lau.jpg"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3">Lẩu Tokbokki</span>
                        </div>
                        <div className="flex flex-col items-center size-28">
                            <Badge content="1" color="danger" placement="top-right">
                                <Avatar
                                    isBordered
                                    size="lg"
                                    radius="md"
                                    src="/foods/nuoc-uong.jpg"
                                />
                            </Badge>
                            <span className="font-sans font-medium mt-3">Thức uống</span>
                        </div>
                    </div>
                    {/* FEEDBACKS */}
                    <div className="flex flex-col relative justify-center">
                        <h3 className="text-center text-lg font-normal mt-20">Testimonials</h3>
                        <h3 className="text-center text-2xl font-semibold mt-3">What's our customer says?</h3>
                        <div className="flex gap-12 justify-center mt-[4rem]">
                            <SwiperCustom slidePerView={1} className=" max-w-[25rem] h-[15rem] ">
                                {feedbacks.map((feedback, index) => (
                                    <TestimonialsCards key={index} feedbacks={feedback} />
                                ))}
                            </SwiperCustom>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home
