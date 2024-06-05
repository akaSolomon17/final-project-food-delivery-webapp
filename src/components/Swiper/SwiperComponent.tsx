import { Card, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import './swiper.css'

const SwiperComponent = () => {
    return (
        <div className="max-w-[25rem] max-h-[15rem] mx-auto">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                modules={[Pagination]}
                className="mySwiper">
                <SwiperSlide >
                    <Card className="max-w-[340px] select-none">
                        <CardBody className="px-3 py-0 text-small text-default-400">
                            <p>
                                Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                            </p>
                        </CardBody>
                        <CardFooter className="justify-between">
                            <div className="flex gap-5">
                                <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card className="max-w-[340px] select-none">
                        <CardBody className="px-3 py-0 text-small text-default-400">
                            <p>
                                Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                            </p>
                        </CardBody>
                        <CardFooter className="justify-between">
                            <div className="flex gap-5">
                                <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </SwiperSlide>
                <SwiperSlide >
                    <Card className="max-w-[340px] select-none">
                        <CardBody className="px-3 py-0 text-small text-default-400">
                            <p>
                                Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                            </p>
                        </CardBody>
                        <CardFooter className="justify-between">
                            <div className="flex gap-5">
                                <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </SwiperSlide>
                <SwiperSlide >
                    <Card className="max-w-[340px] select-none">
                        <CardBody className="px-3 py-0 text-small text-default-400">
                            <p>
                                Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                            </p>
                        </CardBody>
                        <CardFooter className="justify-between">
                            <div className="flex gap-5">
                                <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default SwiperComponent