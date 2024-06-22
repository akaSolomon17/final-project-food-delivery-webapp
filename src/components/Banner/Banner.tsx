import { Image } from '@nextui-org/image'
import { useGetBannerList } from '../../apis/banners/getBannerList.api'
import SwiperCustom from '../Swiper/SwiperCustom'
import { Banners } from '../../types/banner.type'

export const Banner = () => {
    const { bannerList } = useGetBannerList()
    const bannerListed = bannerList?.data || []

    return (
        <div>
            <SwiperCustom slidePerView={1} className='max-h-[34rem]' isBanner={true} isPagination={false}>
                {bannerListed.map((item: Banners, index: number) =>
                    <Image
                        key={index}
                        alt={item.alt}
                        src={item.img}
                        radius="none"
                        className='object-center w-full select-none'
                    />)
                }
            </SwiperCustom>
        </div>
    )
}
<Image
    // isZoomed
    alt="home banner"
    src="banners/thirdBanner.jpg"
    radius="none"
/>