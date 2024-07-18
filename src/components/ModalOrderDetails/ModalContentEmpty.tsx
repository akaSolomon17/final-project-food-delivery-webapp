import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FC } from "react";
import { IModalOrderDetailsProps } from "../../types/modal.type";

const ModalContentEmpty: FC<IModalOrderDetailsProps> = ({
  onOpenChange,
  isOpen,
  // orderId,
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
                {/* <p className="font-semibold">Details Order #{orderId}</p> */}
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-between">
                  <div className="text-default-400">
                    Đơn hàng này đã bị huỷ.
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
    </div>
  );
};

export default ModalContentEmpty;
