import React, { useEffect, useState } from 'react'
import LoadMore from '../../components/LoadMore/LoadMore';
import { Image, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Card, CardBody, CardFooter, Chip } from '@nextui-org/react'
import { useNavigate, useParams } from "react-router-dom"

import { StarIcon } from '../../components/StarRating/Star';
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { BsCartPlus } from "react-icons/bs";
import { BiSolidCart } from "react-icons/bi";
import { ImSpoonKnife } from "react-icons/im";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { IoIosArrowDropdown } from "react-icons/io";

import SwiperCustom from '../../components/Swiper/SwiperCustom';
import { useGetFoodById } from '../../apis/products/getFoodById.api';
import { useGetFoodListRecommended } from '../../apis/products/getFoodListRecommended.api';
import { Food } from '../../types/foods.type';
import { useLoadMoreFetch } from '../../apis/loadMoreFetch.api';
import { Feedback, Reviews } from '../../types/feedbacks.type';
import { useGetReviewsList } from '../../apis/feedbacks/getReviewsList.api';


const ProductDetails = () => {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Newest"]));
    const [quantity, setQuantity] = useState<number>(1)

    const { productId } = useParams();
    const navigate = useNavigate()

    const { foodId } = useGetFoodById(productId || "0")
    const foodIdData = foodId?.data || {
        id: "0",
        avgRate: 1,
        categoryId: "",
        description: "Description is not available!",
        img: "https://res.cloudinary.com/dooge27kv/image/upload/v1718340358/Error/unavailable-image_ndp6qa.jpg",
        isExclusive: "false",
        price: "NaN",
        title: "Title is not available!"
    }

    // GET Recommended food list and exclude the current food from list
    const { recommendedResult } = useGetFoodListRecommended(foodIdData.category, foodIdData.id)
    const foodListRecommended = recommendedResult?.data || []

    // GET comment by page & limit
    const [page, setPage] = useState<number>(1)
    const [data, setData] = useState<Feedback[]>([])

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").split("_").join(" "),
        [selectedKeys]
    );

    const { data: commentLoadMore, totalPages, isLoading, refetch } = useLoadMoreFetch(
        'userReview',
        page,
        2,
        'id',
        selectedValue === 'Newest' ? 'desc' : 'asc')

    useEffect(() => {
        if (commentLoadMore) {
            setData((prevData) => {
                if (page === 1) {
                    return commentLoadMore;
                }
                const newData = commentLoadMore.filter((item: Food) => !prevData.some(prevItem => prevItem.id === item.id));
                return [...prevData, ...newData];
            });
        }
    }, [page, commentLoadMore])

    useEffect(() => {
        refetch()
        setPage(1); // Reset page về 1 khi thay đổi sắp xếp
    }, [refetch, selectedValue]);

    const handleAddToCart = (productId: string, productName: string) => {
        const cart = JSON.parse(localStorage.getItem('cart') ?? "[]");
        console.log("🚀 ~ cart:", cart);
        const existingProduct = cart.find((item: { id: string }) => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ id: productId, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Thêm ${productName} vào giỏ hàng thành công!`);
    }

    // HANDLE QUANTITY
    const handleIncrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    const handleDecrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    }

    return (
        <div className='flex flex-col gap-28'>
            <div className='flex justify-center mt-10'>
                <div className="flex gap-16">
                    <SearchBar />
                </div>
            </div>
            <div className="dynamic-products flex gap-24 justify-center">
                <Image alt='product-img' src={foodIdData.img} shadow='sm' width={541} height={496} />
                <div className="flex flex-col product-info gap-8">
                    <h1 className='font-extrabold font-sans text-3xl'>{foodIdData.title}</h1>
                    <p className='font-lato font-extrabold text-2xl '>{foodIdData.price + " VND"}</p>
                    <p className='font-lato font-normal text-lg max-w-[450px]'>{foodIdData.description}</p>
                    <p className='font-lato font-normal text-[#626264] text-lg flex items-center gap-2'><ImSpoonKnife />{foodIdData.category}</p>
                    <div className='flex items-center gap-4'>
                        <Button radius='full' onClick={handleDecrementQuantity}><AiOutlineMinus /></Button>
                        <h1 className='font-lato font-semibold'>{quantity}</h1>
                        <Button radius='full' onClick={handleIncrementQuantity}><AiOutlinePlus /></Button>
                    </div>
                    <div className="flex gap-4">
                        <Button className='bg-black text-white font-lato w-[15rem]' radius='full'>Order Now</Button>
                        <Button className='bg-white font-lato w-[9rem] border-2' radius='full' onClick={() => handleAddToCart(foodIdData.id, foodIdData.title)} startContent={<BiSolidCart color='#BCBFC2' size={18} />}>Add to Cart</Button>
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
                                        {selectedValue}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Static Actions"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={setSelectedKeys}
                                >
                                    <DropdownItem key="Newest" textValue='Newest'>Newest</DropdownItem>
                                    <DropdownItem key="Oldest" textValue='Oldest'>Oldest</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    {
                        data.map((item: Feedback, index: number) => (
                            <div className="comments flex justify-evenly pb-7 border-b" key={index}>
                                <div>
                                    <Avatar src={item.avatar} />
                                </div>
                                <div className='min-w-[405px] gap-3'>
                                    <div className='flex justify-between '>
                                        <h1 className='text-xl font-bold'>{item.name}</h1>
                                        <StarIcon size={16} value={item.reviews?.[0].rate} />
                                    </div>
                                    <p className='text-lg'>{item.reviews?.[0].comment}</p>
                                    <div className='font-lato flex gap-3'>
                                        <h3 className='font-normal text-[#777E90]'>about 1 hour ago</h3>
                                        <h2 className='font-semibold'>Like</h2>
                                        <h2 className='font-semibold'>Reply</h2>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        totalPages && page < totalPages && (
                            <LoadMore content={isLoading ? 'Loading...' : 'Load more comments'} clickEvent={() => setPage(page + 1)} />
                        )
                    }
                </div>
                <div className="also-like max-h-[30rem] mb-20">
                    <SwiperCustom slidePerView={4} className='w-[83rem] h-full flex flex-col' isPagination={false} isBanner={false} headerContent='You may also like'>
                        {foodListRecommended.map((item: Food) => (
                            <Card shadow="sm" className=" max-h-[27rem] min-w-[19rem] max-w-[19rem]" key={item.id} isPressable onPress={() => navigate(`/product-details/${item.id}`)}>
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