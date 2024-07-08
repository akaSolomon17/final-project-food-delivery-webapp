import { Divider } from '@nextui-org/react'
import { useCartActions, useCartDistance, useCartTimeArrival } from '../../zustand/cartStore'

const DeliveryInfo = () => {
    const cartDistance = useCartDistance()
    const cartTimeArrival = useCartTimeArrival()
    const { setNote } = useCartActions()
    // TASK
    // Thêm thời gian giao dự kiến: sử dụng useRamdomTimeDelivery ở phần cart và set nó lên store sau đó lấy xuống đây để đồng bộ

    return (
        <div className='min-w-[624px] w-[624px] h-fit bg-white mt-[24px] mx-auto rounded-md'>
            <h2 className='font-semibold text-xl p-4'>Giao đến</h2>
            <Divider />
            <div className='p-4'>
                <h5 className='text-default-400 text-sm'>Thời gian giao hàng dự kiến</h5>
                <p className='text-md font-semibold'>{cartTimeArrival} phút ({cartDistance})</p>
            </div>
            <Divider />
            <form action="" className='flex flex-col justify-center items-center p-4'>
                <div className='w-full'>
                    <div>
                        <h1 className='pb-2 text-default-400'>Địa chỉ</h1>
                        <input className='border-1 rounded-md w-full h-[48px] p-3' value="132-136 Lê Đình Lý, P.Hoà Thuận Đông, Q.Hải Châu, TP.Đà Nẵng" disabled />
                    </div>
                    <div>
                        <h1 className='py-2 text-default-400'>Ghi chú</h1>
                        <input className='border-1 rounded-md w-full h-[48px] p-3' placeholder="Hãy gặp tôi tại sảnh" onChange={(e) => setNote(e.target.value)} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default DeliveryInfo