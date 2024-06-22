import { Banner } from "../components/Banner/Banner"
import { Card, CardBody, CardFooter, Image, Badge, Avatar, Chip } from "@nextui-org/react";

import SwiperCustom from "../components/Swiper/SwiperCustom";
import TestimonialsCards from "../components/Testimonials/TestimonialsCards";
import { useGetExclusiveFoodList } from "../apis/products/getFoodList.api";
import { Foods } from "../types/foods.type";
import { useGetFeedbacksApprovedList } from "../apis/feedbacks/getFeedbacksList.api";
import { Feedback } from "../types/feedbacks.type";
import { useNavigate } from "react-router-dom";

const Home = () => {
    // Exclusive food list data
    const { exclusiveFoodList } = useGetExclusiveFoodList()
    const exclusiveFoodListData = exclusiveFoodList?.data || []

    // Feedbacks approved list data
    const { feedbacksApprovedList } = useGetFeedbacksApprovedList()
    const feedbacksApprovedListData = feedbacksApprovedList?.data || []

    const navigate = useNavigate()

    return (
        <div>
            <Banner />
            <div className="most-popular mt-9">
                <h3 className="text-center text-lg font-normal">Most Popular</h3>
                <h3 className="text-center text-2xl font-semibold mt-3">Our Exclusive Kimbap</h3>
                <div className="flex flex-rows justify-center mt-[4rem]">
                    {exclusiveFoodListData.map((item: Foods, index: number) => (
                        <Card shadow="sm" className="mx-[30px] max-h-[750px]" key={index} isPressable onPress={() => navigate(`/product-details/${item.id}`)}>
                            <CardBody className="overflow-visible p-0 cardbody h-[420px] max-h-[420px]">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={item.title}
                                    className="w-full object-cover h-[400px] select-none"
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
                            <SwiperCustom slidePerView={1} className=" max-w-[25rem] h-[20rem]">
                                {feedbacksApprovedListData.map((item: Feedback, index: number) => (
                                    <TestimonialsCards key={index} feedbacks={item} />
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
