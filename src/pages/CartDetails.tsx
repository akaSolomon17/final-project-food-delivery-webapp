import { Button, Divider, Image, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi2";
import { useGetFoodByIds } from '../apis/products/getFoodById.api';
import { useNavigate } from 'react-router-dom';
import { Food } from '../types/foods.type';

interface ICart {
    id: string;
    quantity: number;
}

interface IQuantities {
    [key: string]: number;
}

const CartDetails = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useState<ICart[]>([]);
    const [quantities, setQuantities] = useState<IQuantities>({} as IQuantities);
    const [totalPrice, setTotalPrice] = useState(0);
    const { data: foodsId, isLoading, isError } = useGetFoodByIds(cart.map((item: ICart) => item.id))
    console.log(cart.map((item: ICart) => item.id));

    // FORMAT VND CURRENCY
    const formatVnCurrency = (price: number) => {
        return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    // GET LocalStorage
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart') ?? '[]');
        setCart(cartItems);
    }, [])

    // Quantity state
    useEffect(() => {
        if (foodsId) {
            const initialQuantities: IQuantities = {};
            cart.forEach((item) => {
                initialQuantities[item.id] = item.quantity; // Initialize quantity to 1 for each item
            });
            setQuantities(initialQuantities);
        }
    }, [foodsId, cart]);

    useEffect(() => {
        if (foodsId) {
            let total = 0;
            foodsId.forEach((item) => {
                total += item.priceNumber * (quantities[item.id] || 1);
            });
            setTotalPrice(total);
        }
    }, [foodsId, quantities]);

    const handleCartChange = (itemId: string, change: number) => {
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            const newQuantity = newQuantities[itemId] + change // validate quantity >= 1

            if (newQuantity < 1) {
                if (window.confirm("Bạn có muốn xoá sản phẩm này không?")) {
                    handleDeleteFromCart(itemId);
                    return prevQuantities;
                } else {
                    newQuantities[itemId] = 1; // Reset to 1 if user does not confirm deletion
                }
            } else {
                newQuantities[itemId] = newQuantity;
            }
            const updatedCart: ICart[] = cart.map((item: ICart) => item.id === itemId ? { ...item, quantity: newQuantities[itemId] } : item);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return newQuantities;
        });
    };

    const calcTotalPriceEachItem = (price: number, id: string) => {
        let totalPrice = 0;
        if (quantities[id]) {
            totalPrice = price * quantities[id];
        }
        return formatVnCurrency(totalPrice);
    }

    const handleDeleteFromCart = (id: string) => {
        setCart((prevCart) => {
            const newCart = prevCart.filter((item: ICart) => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });

        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[id];
            return newQuantities;
        });
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error...</div>
    }
    const rows = foodsId ?? [];
    return (
        <div className='flex flex-col items-center gap-7'>
            <div className='flex gap-1 text-left w-[750px] font-lato text-lg'>
                <h1 className='font-semibold'>Cart</h1>
                <span className='text-default-600'>{cart.length}</span>
            </div>
            <div className='w-[750px] h-[350px]'>
                <Table aria-label="Example table with custom cells"
                    radius='sm'
                    isStriped
                    isHeaderSticky
                    classNames={{
                        base: "max-h-[370px] overflow-y-scroll",
                        table: "min-h-[100px]",
                    }}>
                    <TableHeader>
                        <TableColumn>Sản phẩm</TableColumn>
                        <TableColumn align='center'>Giá</TableColumn>
                        <TableColumn align='center'>Số lượng</TableColumn>
                        <TableColumn align='center'>Tổng</TableColumn>
                        <TableColumn>Hành động</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"Giỏ hàng trống!"}>
                        {rows?.map((item: Food) => (
                            <TableRow
                                key={item.id}
                                className='max-h-[100px] h-[100px]'>
                                <TableCell className='flex gap-4 max-h-[100px] h-[100px]'>
                                    <Image
                                        width={70}
                                        src={item.img}
                                        alt="Food cover"
                                        className='select-none'
                                    />
                                    <div className='flex flex-col'>
                                        <span className='font-lato font-semibold select-none'>{item.title}</span>
                                        <p className='max-w-[270px] overflow-y-auto scrollbar-hide select-none'>{item.description}</p>
                                    </div>
                                </TableCell>
                                <TableCell className='select-none '>{formatVnCurrency(item.priceNumber)}</TableCell>
                                <TableCell className='w-[120px] '>
                                    <div className='flex items-center h-[40px] justify-center rounded-full'>
                                        <Button
                                            startContent={<AiOutlineMinus />}
                                            className='cursor-pointer min-w-[1rem]'
                                            radius='none'
                                            onClick={() => handleCartChange(item.id as string, -1)}>
                                        </Button>
                                        <Input
                                            className="disable-hover cursor-default min-h-[10px] w-[40px] p-0 select-none items-center"
                                            value={(quantities[item.id ?? ''] || "") as string}
                                            radius='none'
                                            readOnly
                                        >{
                                                quantities[item.id as string]
                                            }</Input>
                                        <Button
                                            startContent={<AiOutlinePlus />}
                                            className='cursor-pointer min-w-[1rem]'
                                            radius='none'
                                            onClick={() => handleCartChange(item.id as string, 1)}>
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className='select-none'>{calcTotalPriceEachItem(item.priceNumber, item.id as string)}</TableCell>
                                <TableCell className='text-default-500 cursor-pointer'>
                                    <HiOutlineTrash
                                        size={20}
                                        onClick={() => handleDeleteFromCart(item.id as string)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center gap-5 w-[750px] text-left text-default-600'>
                <span>Voucher</span>
                <Button
                    className='w-[140px] bg-white flex-col border border-black font-semibold'
                    radius='full'>
                    HAPPY
                </Button>
                <span>Chúc mừng! Bạn vừa giảm 10% tổng giá trị giỏ hàng!</span>
                <div className='flex gap-1'>
                    <span>Giảm: </span>
                    <span className='font-semibold'>15.000đ</span>
                </div>
            </div>
            <Divider className=' w-[750px]'></Divider>
            <div className='flex items-center gap-x-80'>
                <div
                    className='flex text-default-600 gap-2 cursor-pointer'
                    onClick={() => navigate('/menu')}>
                    <div>←</div>
                    <div>Tiếp tục mua sắm</div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='flex gap-2 select-none'>
                        <span>Tổng giá:</span>
                        <span className='font-semibold'>{formatVnCurrency(totalPrice)}</span>
                    </div>
                    <Button className='bg-black text-bold text-[#fff]'>
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default CartDetails