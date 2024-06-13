import SwiperCustom from '../components/Swiper/SwiperCustom'
import { Card, CardBody, CardFooter, Chip, Image } from '@nextui-org/react';
import { BsCartPlus } from 'react-icons/bs';
// import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2';
// import { useSwiper } from 'swiper/react';
// import { useNavigate } from 'react-router-dom';
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

const SliderUI = () => {
    // const navigate = useNavigate();
    // onPressEnd={() => { navigate("/product-details") }}

    return (
        <div>
            <SwiperCustom slidePerView={4} className='w-[83rem] h-full flex flex-col' isPagination={false} headerContent='Recommended'>
                {list.map((item, index) => (
                    <Card shadow="sm" className=" max-h-[27rem] min-w-[19rem] max-w-[19rem]" key={index} isPressable>
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
    )
}

export default SliderUI