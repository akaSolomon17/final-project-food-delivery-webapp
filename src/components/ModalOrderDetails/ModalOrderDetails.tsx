import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FC } from "react";
import { IOrderDetails } from "../../types/historyOrders.type";
import { formatCurrency, formatVnCurrency } from "../../utils/formatCurrency";
import { FaRegCalendarAlt } from "react-icons/fa";
import { fomartDateTime } from "../../utils/fomartDateTime";
import { IModalOrderDetailsProps } from "../../types/modal.type";

const ModalOrderDetails: FC<IModalOrderDetailsProps> = ({
  onOpenChange,
  isOpen,
  orderDetail,
}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="font-semibold">Details Order #{orderDetail.id}</p>
                <div className="flex items-center gap-2">
                  <FaRegCalendarAlt size={16} className="text-default-400" />
                  <p className="text-default-400 text-[16px]">
                    {fomartDateTime(orderDetail?.orderDate)}
                  </p>
                </div>
                <p className="text-sm font-normal text-default-400">
                  Ghi chú: {orderDetail?.note}
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-between">
                  {orderDetail?.orderDetails.map(
                    (item: IOrderDetails, index: number) => (
                      <div className="flex justify-between" key={index}>
                        <div className="flex gap-2">
                          <p>{item.quantity}</p>
                          <p>X</p>
                          <p>{item.title}</p>
                        </div>
                        <p>
                          {formatCurrency(
                            Number(item.priceNumber) * parseInt(item.quantity),
                          )}
                        </p>
                      </div>
                    ),
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-lg">Tổng:</p>
                  <div>
                    <p>
                      {formatVnCurrency(orderDetail?.discountPrice as number)}
                    </p>
                    {orderDetail?.discountPrice !== orderDetail?.totalPrice && (
                      <p className="line-through text-default-500 text-sm text-right">
                        {formatVnCurrency(orderDetail?.totalPrice)}
                      </p>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className="border-2" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* } */}
    </div>
  );
};

export default ModalOrderDetails;
