import React from 'react'
import { Food } from '../../types/foods.type'
import { ImSpoonKnife } from 'react-icons/im'
import { AiFillTags, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { Button, Chip, Image } from '@nextui-org/react'
import { BiSolidCart } from 'react-icons/bi'
import { useProductDetailsActions, useQuantity } from '../../zustand/productDetailStore.ts'
import { useCartActions, useQuantities } from '../../zustand/cartStore.ts'
import { notify } from '../../hooks/Toastify/notify.ts'
import { EToastifyStatus } from '../../types/enums.type.ts'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading.tsx'
// TYPES
interface IProductContent {
    foodIdData: Food,
    foodLoading: boolean
}

const ProductContent: React.FC<IProductContent> = ({ foodIdData, foodLoading }) => {
    const { TOAST_SUCCESS } = EToastifyStatus
    const navigate = useNavigate()
    const [isOrderNow, setIsOrderNow] = React.useState<boolean>(false)
    const quantity = useQuantity()
    const quantities = useQuantities()
    const { setQuantity } = useProductDetailsActions()
    const { setCart, setQuantities } = useCartActions()

    const handleIncrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const handleDecrementQuantity = () => {
        setQuantity(Math.max(1, quantity - 1));
    }

    const handleAddToCart = (productId: string, productName: string) => {
        const cart = JSON.parse(localStorage.getItem('cart') ?? "[]");
        const existingProduct = cart.find((item: { id: string }) => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
            setQuantities({ ...quantities, [productId]: existingProduct.quantity })
        }
        else {
            setCart([...cart, { id: productId, quantity }]);
            cart.push({ id: productId, quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        !isOrderNow && notify(`Thêm ${productName} vào giỏ hàng thành công!`, TOAST_SUCCESS);
    }

    const handleOrderNow = () => {
        const cart = JSON.parse(localStorage.getItem('cart') ?? "[]");
        setIsOrderNow(true);
        navigate('/checkout')
        if (foodIdData.id) {
            cart.length = 0;
            localStorage.setItem('cart', JSON.stringify(cart));
            handleAddToCart(foodIdData.id, foodIdData.title);
        }
        else return
    }

    return (
        <div className='dynamic-products flex gap-24 ms-80'>
            <Image alt='product-img' src={foodIdData.img as string} shadow='sm' width={541} height={496} isLoading={foodLoading} />
            <div className="flex flex-col product-info gap-8 justify-start">
                {
                    foodLoading ?
                        <div className="flex flex-col product-info gap-8 h-[273px] justify-center items-center">
                            <Loading />
                        </div> : (
                            <>
                                <h1 className='font-extrabold font-sans text-3xl'>{foodIdData.title}</h1>
                                <p className='font-lato font-extrabold text-2xl '>{foodIdData.price + " VND"}</p>
                                <div className='flex gap-2'>
                                    {
                                        foodIdData.category === "Box Yummy" &&
                                        <div>
                                            <Chip className="flex flex-row bg-slate-500 text-white self-end mt-[5px]">
                                                <div className="flex items-center gap-2">
                                                    <AiFillTags />
                                                    <p className=''>Recommended</p>
                                                </div>
                                            </Chip>
                                        </div>
                                    }
                                    {
                                        foodIdData.isExclusive === "true" &&
                                        <div>
                                            <Chip className="flex flex-row bg-slate-500 text-white self-end mt-[5px]">
                                                <div className="flex items-center gap-2">
                                                    <AiFillTags />
                                                    <p className=''>Best seller</p>
                                                </div>
                                            </Chip>
                                        </div>
                                    }

                                </div>
                                <p className='font-lato font-normal text-lg max-w-[450px]'>{foodIdData.description}</p>
                                <p className='font-lato font-normal text-[#626264] text-lg flex items-center gap-2'><ImSpoonKnife />{foodIdData.category}</p>
                            </>
                        )
                }
                <div className='flex items-center gap-4'>
                    <Button radius='full' onClick={handleDecrementQuantity}><AiOutlineMinus /></Button>
                    <h1 className='font-lato font-semibold'>{quantity}</h1>
                    <Button radius='full' onClick={handleIncrementQuantity}><AiOutlinePlus /></Button>
                </div>
                <div className="flex gap-4">
                    <Button className='bg-black text-white font-lato w-[15rem]' radius='full' onClick={handleOrderNow}>Order Now</Button>
                    <Button className='bg-white font-lato w-[9rem] border-2' radius='full' onClick={() => handleAddToCart((foodIdData.id as string), foodIdData.title)} startContent={<BiSolidCart color='#BCBFC2' size={18} />}>Add to Cart</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductContent