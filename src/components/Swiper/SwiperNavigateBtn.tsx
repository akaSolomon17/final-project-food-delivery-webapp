import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2';
import { useSwiper } from 'swiper/react';

const SwiperNavigateBtn: React.FC<{ headerContent?: string }> = ({ headerContent }) => {
    const swiper = useSwiper();
    return (
        <div className="flex flex-row justify-between items-center gap-x-[60rem] mb-10 order-1">
            <h1 className='font-sans font-bold text-4xl w-[]'>{headerContent ? headerContent : ""}</h1>
            <div className="flex gap-1 items-center">
                <div className='border border-transparent hover:border-[#777E90] hover:rounded-full active:border-[#777E90] active:rounded-full p-2 flex items-center justify-center cursor-pointer transition-all duration-300' onClick={() => swiper.slidePrev()}>
                    <HiOutlineArrowLeft />
                </div>
                <div className='border border-transparent hover:border-[#777E90] hover:rounded-full active:border-[#777E90] active:rounded-full p-2 flex items-center justify-center cursor-pointer transition-all duration-300' onClick={() => swiper.slideNext()}>
                    <HiOutlineArrowRight />
                </div>
            </div>
        </div>
    )
}

export default SwiperNavigateBtn