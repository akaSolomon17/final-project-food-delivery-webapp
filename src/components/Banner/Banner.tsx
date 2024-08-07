import { Image } from "@nextui-org/image";
import { useGetBannerList } from "../../apis/banners/getBannerList.api";
import { Banners } from "../../types/banner.type";
import CSwiper from "../Swiper/CSwiper";

export const Banner = () => {
  const { bannerList } = useGetBannerList();

  return (
    <div>
      <CSwiper
        slidePerView={1}
        className="max-h-[34rem]"
        isBanner={true}
        isPagination={false}
      >
        {bannerList?.data?.length &&
          bannerList?.data.map((item: Banners, index: number) => (
            <Image
              key={index}
              alt={item.alt}
              src={item.img}
              radius="none"
              className="object-center w-full select-none"
            />
          ))}
      </CSwiper>
    </div>
  );
};
<Image
  // isZoomed
  alt="home banner"
  src="banners/thirdBanner.jpg"
  radius="none"
/>;
