import { formatVnCurrency } from '../../../utils/formatCurrency'
import { useTotalPrice } from '../../../zustand/cartStore'

const OrderInfoFooter = () => {
    const totalPrice = useTotalPrice()

    return (
        <div className='flex justify-between p-2 text-sm w-full'>
            <h4>Tổng tạm tính: </h4>
            <h4>{formatVnCurrency(totalPrice)}</h4>
        </div>
    )
}

export default OrderInfoFooter