import { Button } from '@nextui-org/react'
import { useCart, useCartActions, useDiscountInfo, useNote, useTotalPrice } from '../../zustand/cartStore'
import { formatVnCurrency } from '../../utils/formatCurrency'
import { useAddHistoryOrders } from '../../apis/orders/addHistoryOrdersList.api'
import { IHistoryOrders, IOrderDetails } from '../../types/historyOrders.type'
import { useGetHistoryOrdersList } from '../../apis/orders/getHistoryOrdersList.api'
import { useGetFoodList } from '../../apis/products/getFoodList.api'
import { Food } from '../../types/foods.type'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../hooks/Toastify/notify'
import { EOrderStatus, EToastifyStatus } from '../../types/enums.type'
import { useUpdateOrderStatus } from '../../utils/changeOrderStatus'

const { COMPLETED, DELIVERING } = EOrderStatus
const { TOAST_ERROR } = EToastifyStatus

const CheckoutOrder = () => {
    const navigate = useNavigate()
    const totalPrice = useTotalPrice()
    const note = useNote()
    const discountInfo = useDiscountInfo()
    const cart = useCart()
    const { setCart } = useCartActions()
    const { updateOrderStatus } = useUpdateOrderStatus()
    const discountPrice = discountInfo.totalPriceDiscount

    const { data: historyOrderList } = useGetHistoryOrdersList()
    const historyOrderListData = historyOrderList?.data

    const { mutate: addHistoryOrderMutate } = useAddHistoryOrders()

    const { data: foodList } = useGetFoodList()
    const foodListData = foodList?.data

    const getFoodInCart = foodListData?.filter((food: Food) => cart.map((item) => item.id).includes(food.id as string))

    const handleAddOrder = () => {
        const date = Date.now()
        const detailOrder = getFoodInCart?.map((food: Food): IOrderDetails => {
            return {
                id: String(food.id),
                title: food.title,
                priceNumber: String(food.priceNumber),
                quantity: cart.find(item => item.id === food.id)?.quantity.toString() || "1"
            }
        });

        const newHistoryOrders: IHistoryOrders = {
            id: (historyOrderListData?.length + 1).toString(),
            status: DELIVERING,
            orderDate: date,
            totalPrice: totalPrice,
            discountPrice: discountPrice,
            note: note,
            orderDetails: detailOrder
        }


        addHistoryOrderMutate(
            { newHistoryOrders },
            {
                onSuccess: () => {
                    navigate('/your-order')
                    updateOrderStatus(COMPLETED, newHistoryOrders.id)
                    setCart([])
                },
                onError: () => {
                    notify('Đặt đơn thất bại', TOAST_ERROR)
                }
            }
        )
    }

    return (
        <div className='fixed z-50 bottom-0 w-full shadow-[rgba(0,0,16,0.5)_6px_-6px_4px_-8px]'>
            <div className='flex bg-white h-[100px] justify-center items-center'>
                <div className='w-[624px] flex flex-col'>
                    <h2 className='font-semibold text-xl text-left'>Tổng cộng</h2>
                    <div className='flex items-center gap-2 h-[28px]'>
                        <h2 className='font-bold text-xl text-left'>{formatVnCurrency(discountPrice)}</h2>
                        {!(discountPrice === totalPrice) && <h2 className='font-medium text-md text-left line-through'>{totalPrice}</h2>}
                    </div>
                </div>
                <Button className='bg-black text-white w-[264px]' radius='sm' onClick={handleAddOrder}>Đặt đơn</Button>
            </div>
        </div>
    )
}

export default CheckoutOrder