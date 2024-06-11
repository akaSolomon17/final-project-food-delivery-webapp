import React from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperNavigateBtn from './SwiperNavigateBtn';

type SwiperComponentProps = {
    children: React.ReactNode[],
    slidePerView: number,
    className?: string
    isPagination?: boolean
    headerContent?: string
    isBanner?: boolean
}

const SwiperCustom: React.FC<SwiperComponentProps> = (props) => {
    const modules = props.isPagination ? [Pagination] : [Navigation, Autoplay];
    const swiperProps = {
        slidesPerView: props.slidePerView,
        spaceBetween: 30,
        modules,
        className: props.className,
        pagination: props.isPagination ? { dynamicBullets: true, clickable: true } : false,
        navigation: props.isPagination ? false : true,
        autoplay: props.isBanner ? { delay: 2500, disableOnInteraction: false } : false,
    };

    return (
        <div className="mx-auto">
            <Swiper {...swiperProps}>
                <SwiperNavigateBtn headerContent={props.headerContent}></SwiperNavigateBtn>
                {props.children.map((child, index) =>
                (
                    <SwiperSlide key={index} className='flex items-center justify-center text-center text-sm bg-white'>
                        {child}
                    </SwiperSlide>
                )
                )}
            </Swiper>
        </div>
    )
}
export default SwiperCustom