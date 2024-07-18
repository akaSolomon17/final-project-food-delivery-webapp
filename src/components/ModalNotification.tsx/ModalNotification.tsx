import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FC } from "react";
import { IModalProps } from "../../types/modal.type";

const ModalNotification: FC<IModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  children,
}) => {
  return (
    <Modal className="z-999" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="default" onPress={() => onOpenChange}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalNotification;
