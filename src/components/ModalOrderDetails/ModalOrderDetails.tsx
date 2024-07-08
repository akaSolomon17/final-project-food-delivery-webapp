import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { FC } from 'react';
import { useGetHistoryOrdersList } from '../../apis/orders/getHistoryOrdersList.api';
import { IHistoryOrders, IOrderDetails } from '../../types/historyOrders.type';
import { formatCurrency, formatVnCurrency } from '../../utils/formatCurrency';
import { FaRegCalendarAlt } from "react-icons/fa";
import { fomartDateTime } from '../../utils/fomartDateTime';
// import ModalContentEmpty from './ModalContentEmpty';
// import { EOrderStatus } from '../../types/enums.type';

const ModalOrderDetails: FC<{ onOpenChange: (isOpen: boolean) => void, isOpen: boolean, orderId: string }> = ({ onOpenChange, isOpen, orderId }) => {
    // const { CANCELED } = EOrderStatus
    const { data: historyOrderList } = useGetHistoryOrdersList()
    const historyOrderListData = historyOrderList?.data
    const ordersById = historyOrderListData?.find((order: IHistoryOrders) => order.id === orderId)

    /* Sau 5-10p (Thời gian này sẽ xử lý generate random sau khi truyền từ cart -> checkout -> order so sánh với thời gian hiện tại) sẽ đổi status thành COMPLETED
    * Handle nút bấm cancel order nếu status là DELIVERING thì sẽ chuyển thành CANCELED còn nếu COMPLETED thì sẽ sẽ DISABLE nút CANCEL */

    return (
        <div>
            {/* {ordersById && ordersById.status === CANCELED ? 
                <ModalContentEmpty isOpen={isOpen} onOpenChange={onOpenChange} orderId={orderId} />
             :  */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className='font-semibold'>Details Order #{orderId}</p>
                                <div className='flex items-center gap-2'>
                                    <FaRegCalendarAlt size={16} className='text-default-400' />
                                    <p className='text-default-400 text-[16px]'>
                                        {fomartDateTime(ordersById?.orderDate)}
                                    </p>
                                </div>
                                <p className='text-sm font-normal text-default-400'>Ghi chú: {ordersById?.note}</p>
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col justify-between'>
                                    {
                                        ordersById?.orderDetails.map((item: IOrderDetails, index: number) => (
                                            <div className='flex justify-between' key={index}>
                                                <div className='flex gap-2'>
                                                    <p>{item.quantity}</p>
                                                    <p>X</p>
                                                    <p>{item.title}</p>
                                                </div>
                                                <p>
                                                    {formatCurrency(Number(item.priceNumber) * parseInt(item.quantity))}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='flex justify-between'>
                                    <p className='font-semibold text-lg'>Tổng:</p>
                                    <div>
                                        <p>{formatVnCurrency(ordersById?.discountPrice)}</p>
                                        {
                                            ordersById?.discountPrice !== ordersById?.totalPrice &&
                                            <p className='line-through text-default-500 text-sm text-right'>{formatVnCurrency(ordersById?.totalPrice)}</p>
                                        }
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className='border-2' variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* } */}
        </div >
    )
}

export default ModalOrderDetails