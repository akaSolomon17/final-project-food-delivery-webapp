import OrderInfo from '../components/Checkout/OrderInfo'
import OrderVoucher from '../components/Checkout/OrderVoucher/OrderVoucher'
import DetailsPayment from '../components/Checkout/DetailsPayment'
import DeliveryInfo from '../components/Checkout/DeliveryInfo'
import CheckoutOrder from '../components/Checkout/CheckoutOrder'
import { useGetFoodByIds } from '../apis/products/getFoodById.api'
import { ICart } from '../types/carts.type'
import { useCart } from '../zustand/cartStore'
import EmptyOrder from '../components/Checkout/EmptyOrder'
import CheckoutHeader from '../components/Checkout/CheckoutHeader'
import Loading from '../components/Loading/Loading'

const Checkout = () => {
  const cart = useCart()
  const { data: foodsId, isLoading } = useGetFoodByIds(cart.map((item: ICart) => item.id))
  const rows = foodsId ?? [];
  return (
    <div className='bg-[#F7F7F7] h-full'>
      {
        isLoading ?
          <div className='h-screen flex items-center justify-center'>
            <Loading />
          </div> :
          <>
            {rows.length > 0 ?
              <div >
                <CheckoutHeader />
                <div className='h-full'>
                  <DeliveryInfo />
                  <OrderInfo />
                  <DetailsPayment />
                  <OrderVoucher />
                  <CheckoutOrder />
                </div>
              </div> :
              <EmptyOrder />
            }
          </>
      }
    </div>
  )
}

export default Checkout