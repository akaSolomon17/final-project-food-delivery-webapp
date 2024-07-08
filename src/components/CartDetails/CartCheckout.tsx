import { formatVnCurrency } from '../../utils/formatCurrency'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react';
import { IOrder } from '../../types/historyOrders.type';
import { useCart, useCartActions, useDiscountInfo, useIsVoucherApplied, useTotalPrice } from '../../zustand/cartStore';
import { notify } from '../../hooks/Toastify/notify';
import { EToastifyStatus } from '../../types/enums.type';

const CartCheckout = () => {
    const { TOAST_ERROR } = EToastifyStatus
    const navigate = useNavigate()
    const cart = useCart()
    const totalPrice = useTotalPrice()
    const isVoucherApplied = useIsVoucherApplied()
    const discountInfo = useDiscountInfo()
    const { setCart } = useCartActions()
    // HANDLE CHECKOUT
    const handleCheckout = () => {
        if (cart.length === 0) {
            notify("Giỏ hàng trống! Không thể thanh toán!", TOAST_ERROR);
            return;
        }

        const orderId = Date.now().toString().slice(-5);
        const newOrder: IOrder = {
            id: orderId,
            items: cart,
            status: 'ordering',
            estimateTime: Date.now() + 1 * 60 * 1000, // 1 minutes from now
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders') ?? '[]');
        existingOrders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        setCart([]);
        localStorage.removeItem('cart');
        navigate('/your-order');
    };

    return (
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
                    <span className='font-semibold'>{isVoucherApplied ? formatVnCurrency(discountInfo.totalPriceDiscount || 0) : formatVnCurrency(totalPrice)}</span>
                </div>
                <Button className='bg-black text-bold text-[#fff]' onClick={handleCheckout}>
                    Thanh toán
                </Button>
            </div>
        </div>
    )
}

export default CartCheckout