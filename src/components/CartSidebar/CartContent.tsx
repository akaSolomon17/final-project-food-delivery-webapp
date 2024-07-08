import { Image } from '@nextui-org/react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useGetFoodByIds } from '../../apis/products/getFoodById.api'
import { ICart, IQuantities } from '../../types/carts.type'
import { useCart, useCartActions, useQuantities } from '../../zustand/cartStore'
import { Food } from '../../types/foods.type'
import { useEffect, useState } from 'react'
import { formatCurrency } from '../../utils/formatCurrency'

const CartContent = () => {
    const [isRemove, setIsRemove] = useState<string | null>(null)
    const cart = useCart()
    const quantities = useQuantities()
    const { setQuantities, setCart, setTotalPrice, loadFromLocalStorage } = useCartActions()

    const { data: foodsId } = useGetFoodByIds(cart.map((item: ICart) => item.id))
    const rows = foodsId ?? [];

    useEffect(() => {
        loadFromLocalStorage();
    }, [loadFromLocalStorage]);

    // QUANTITY CHANGE
    useEffect(() => {
        if (foodsId) {
            const initialQuantities: IQuantities = {};
            cart.forEach((item) => {
                initialQuantities[item.id] = item.quantity; // Initial quantity from quantity in cart(local storage)
            });
            setQuantities(initialQuantities);
        }
    }, [foodsId, cart]);

    const calcTotalPriceEachItem = (price: number, id: string) => {
        let totalPrice = 0;
        if (quantities[id]) {
            totalPrice = price * quantities[id];
        }
        return formatCurrency(totalPrice);
    }

    const handleCartChange = (itemId: string, change: number) => {
        const updateQuantities = ((prevQuantities: IQuantities) => {
            const newQuantities = { ...prevQuantities };
            const newQuantity = newQuantities[itemId] + change

            if (newQuantity <= 0) {
                setIsRemove(itemId);
            } else {
                newQuantities[itemId] = newQuantity;
                setIsRemove(null);
            }
            const updatedCart: ICart[] = cart.map((item: ICart) =>
                item.id === itemId ?
                    { ...item, quantity: newQuantities[itemId] } :
                    item
            );
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return newQuantities;
        });

        setQuantities(updateQuantities(quantities))
    };

    const handleDeleteFromCart = (id: string) => {
        const updateCart = ((prevCart: ICart[]): ICart[] => {
            const newCart = prevCart.filter((item: ICart) => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(newCart));
            if (newCart.length === 0) {
                setTotalPrice(0);
            }
            return newCart;
        });

        setCart(updateCart(cart))

        const updateQuantities = ((prevQuantities: IQuantities) => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[id];
            return newQuantities;
        });

        setQuantities(updateQuantities(quantities))
    }

    return (
        <div className='overflow-scroll max-h-[700px]'>
            {rows?.map((item: Food, index) => (
                <div className='pt-4 px-4' key={index}>
                    <div className='flex justify-between items-center border-b border-gray-200 pb-4 gap-2'>
                        <div className='flex gap-3 items-center'>
                            <div className="flex justify-center items-center">
                                {/* MINUS BUTTON */}
                                <button className='cursor-pointer min-w-[1rem]' onClick={() => handleCartChange(item.id as string, -1)}>
                                    <AiOutlineMinus size={13} color='#00A5CF' />
                                </button>

                                <span className='w-6 text-center select-none'>{(quantities[item.id ?? ''] || "") as string}</span>

                                {/* PLUS BUTTON */}
                                <button className='cursor-pointer min-w-[1rem]' onClick={() => handleCartChange(item.id as string, 1)}>
                                    <AiOutlinePlus size={13} color='#00A5CF' />
                                </button>
                            </div>
                            <Image width={60} radius='none' src={item.img as string} alt="Food cover" className='select-none' />
                            <div>
                                <h1 className='text-sm font-semibold'>{item.title}</h1>
                                <p className='scrollbar-hide overflow-scroll max-w-[255px] max-h-[70px] text-sm'>{item.description}</p>
                            </div>
                        </div>
                        <div>
                            {isRemove === item.id ? <button className='text-red-500 text-sm font-bold w-[60px]' onClick={() => handleDeleteFromCart(item.id as string)}>Remove</button> : <p className='text-sm w-[60px] min-w-[58px] text-right'>{calcTotalPriceEachItem(item.priceNumber, item.id as string)}</p>}
                        </div>
                    </div>
                </div>
            ))}
        </div >
    )
}

export default CartContent