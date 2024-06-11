import React from 'react'
import LoadMore from '../../components/LoadMore/LoadMore';
import { Image, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Card, CardBody, CardFooter, Chip } from '@nextui-org/react'
import { useNavigate } from "react-router-dom"

import { StarIcon } from '../../components/StarRating/Star';
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { BsCartPlus } from "react-icons/bs";
import { BiSolidCart } from "react-icons/bi";
import { ImSpoonKnife } from "react-icons/im";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { IoIosArrowDropdown } from "react-icons/io";
import SwiperCustom from '../../components/Swiper/SwiperCustom';

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
const ProductDetails = () => {
    const [selectedKeys, setSelectedKeys] = React.useState<string>("Newest");

    const navigate = useNavigate()

    return (
        <div className='flex flex-col gap-28'>
            <div className='flex justify-center mt-10'>
                <div className="flex gap-16">
                    <SearchBar />
                </div>
            </div>
            <div className="dynamic-products flex gap-24 justify-center">
                <Image alt='product-img' src='/foods/kimbap-cay.jpg' shadow='sm' width={541} height={496} />
                <div className="flex flex-col product-info gap-8">
                    <h1 className='font-extrabold font-lato text-4xl'>Kimbap Cay</h1>
                    <p className='font-lato font-extrabold text-2xl '>65.000 VND</p>
                    <p className='font-lato font-normal text-lg'>Sản phẩm được đựng vào hộp giấy xinh xắn.</p>
                    <p className='font-lato font-normal text-[#626264] text-lg flex items-center gap-2'><ImSpoonKnife />Kimbap</p>
                    <div className='flex items-center gap-4'>
                        <Button radius='full'><AiOutlineMinus /></Button>
                        <h1 className='font-lato font-semibold'>1</h1>
                        <Button radius='full'><AiOutlinePlus /></Button>
                    </div>
                    <div className="flex gap-4">
                        <Button className='bg-black text-white font-lato w-[15rem]' radius='full'>Order Now</Button>
                        <Button className='bg-white font-lato w-[9rem] border-2' radius='full' startContent={<BiSolidCart color='#BCBFC2' size={18} />}>Add to Cart</Button>
                    </div>
                </div>
            </div>
            <div className="review flex flex-col gap-20 ">
                <div className="review-section ">
                    <div className="flex gap-14 max-w-[473px] text-lg font-lato font-bold ms-[20rem]">
                        <h2>Description</h2>
                        <h2>Reviews</h2>
                        <h2>Ingredients</h2>
                    </div>
                </div>
                <div className="add-review max-w-[473px] flex flex-col gap-10 ms-[20rem]">
                    <div className='flex flex-col gap-5 font-lato'>
                        <h1 className='text-4xl font-extrabold'>Add a review</h1>
                        <p className='text-[#777E90]'>Be the first reviewer to this product!</p>
                        <StarIcon size={24} />
                    </div>
                    <Input
                        type="text"
                        label="Share your thoughts"
                        labelPlacement="inside"
                        className='bg-white'
                        endContent={
                            <div className='flex gap-3 items-center'>
                                <FaRegFaceSmileBeam className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                <Button className='h-[2.3rem] rounded-full bg-black text-white'>Post it! →</Button>
                            </div>
                        }
                    />
                </div>
                <div className="comment max-w-[473px] ms-[20rem] flex flex-col gap-8">
                    <div className="flex justify-between items-center h-[3rem]">
                        <h1 className='text-4xl font-extrabold h-[3rem]'>3 comments</h1>
                        <div className="dropdown">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="bordered" endContent={<IoIosArrowDropdown color='#777E90' size={20} />} disableAnimation>
                                        {selectedKeys}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Static Actions"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={() => (setSelectedKeys)}
                                >
                                    <DropdownItem key="Newest">Newest</DropdownItem>
                                    <DropdownItem key="Oldest">Oldest</DropdownItem>
                                    <DropdownItem key="Rate">Rating</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="comments flex justify-between pb-7 border-b">
                        <div>
                            <Avatar src="https://nextui.org/avatars/avatar-5.png" />
                        </div>
                        <div className='max-w-[405px] gap-3'>
                            <div className='flex justify-between '>
                                <h1 className='text-xl font-bold'>Kim Jong Sik</h1>
                                <StarIcon size={16} value={4} />
                            </div>
                            <p className='text-lg'>Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
                            <div className='font-lato flex gap-3'>
                                <h3 className='font-normal text-[#777E90]'>about 1 hour ago</h3>
                                <h2 className='font-semibold'>Like</h2>
                                <h2 className='font-semibold'>Reply</h2>
                            </div>
                        </div>
                    </div>
                    <div className="comments flex justify-between pb-7 border-b">
                        <div>
                            <Avatar src="https://nextui.org/avatars/avatar-6.png" />
                        </div>
                        <div className='max-w-[405px] gap-3 '>
                            <div className='flex justify-between'>
                                <h1 className='text-xl font-bold'>Kim Jong Sik</h1>
                                <StarIcon size={16} value={2} />
                            </div>
                            <p className='text-lg'>Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
                            <div className='font-lato flex gap-3'>
                                <h3 className='font-normal text-[#777E90]'>about 1 hour ago</h3>
                                <h2 className='font-semibold'>Like</h2>
                                <h2 className='font-semibold'>Reply</h2>
                            </div>
                        </div>
                    </div>
                    <LoadMore content='Loading comment' />
                </div>
                <div className="also-like max-h-[30rem] mb-20">
                    {/* <h1 className='font-extrabold font-lato text-4xl'>You may also like</h1>
                    <div className='flex flex-rows gap-9 mt-[4rem]'>
                        {listFirst.map((item, index) => (
                            <Card shadow="sm" className=" max-h-[26rem] min-w-[19rem] max-w-[19rem] h-[25rem]" key={index} isPressable onPressEnd={() => { navigate("/product-details") }}>
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
                    </div> */}
                    <h1 className='font-extrabold font-lato text-4xl ms-[18.3rem] mb-10'>You may also like</h1>
                    <SwiperCustom slidePerView={4} className='w-[83rem] h-full mySwiper' isPagination={false} isBanner={false}>
                        {list.map((item, index) => (
                            <Card shadow="sm" className=" max-h-[27rem] min-w-[19rem] max-w-[19rem]" key={index} isPressable onPress={() => navigate('/product-details')}>
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
            </div>
        </div>
    )
}

export default ProductDetails