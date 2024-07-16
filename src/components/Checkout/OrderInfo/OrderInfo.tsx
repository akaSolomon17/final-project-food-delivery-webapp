import CartContent from '../../CartSidebar/CartContent'
import CCheckoutLayout from '../../CCheckout/CCheckoutLayout'
import OrderInfoFooter from './OrderInfoFooter'

const OrderInfo = () => {

    return (
        <CCheckoutLayout
            header="Tóm tắt đơn hàng"
            footer={<OrderInfoFooter />}
        >
            <CartContent />
        </CCheckoutLayout>
    )
}

export default OrderInfo