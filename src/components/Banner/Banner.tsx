import { Image } from "@nextui-org/image";
import { useGetBannerList } from "../../apis/banners/getBannerList.api";
import CSwiper from "../Swiper/CSwiper";
import { Banners } from "../../types/banner.type";

export const Banner = () => {
  const { bannerList } = useGetBannerList();
  const bannerListed = bannerList?.data || [];

  return (
    <div>
      <CSwiper
        slidePerView={1}
        className="max-h-[34rem]"
        isBanner={true}
        isPagination={false}
      >
        {bannerListed.map((item: Banners, index: number) => (
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
