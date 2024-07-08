import { Divider } from '@nextui-org/react'
import React from 'react'
import CartContent from '../CartSidebar/CartContent'
import { formatVnCurrency } from '../../utils/formatCurrency'
import { useTotalPrice } from '../../zustand/cartStore'

const OrderInfo = () => {
    const totalPrice = useTotalPrice()
    
    return (
        <div className='min-w-[624px] w-[624px] h-fit bg-white mt-[24px] mx-auto rounded-md'>
            <h2 className='font-semibold text-xl p-4'>Tóm tắt đơn hàng</h2>
            <Divider />
            <CartContent />
            <div className='flex justify-between p-5 text-sm'>
                <h4>Tổng tạm tính: </h4>
                <h4>{formatVnCurrency(totalPrice)}</h4>
            </div>
        </div>
    )
}

export default OrderInfo