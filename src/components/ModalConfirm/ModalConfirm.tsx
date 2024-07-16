import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { IModalProps } from '../../types/modal.type';

const ModalConfirm: React.FC<IModalProps> = ({ isOpen, onOpenChange, title, children, onConfirm, onCancel }) => {

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            {title && <ModalHeader>{title}</ModalHeader>}
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
                <Button onPress={() => onCancel || onOpenChange}>
                    Hủy bỏ
                </Button>
                <Button color="danger" onPress={() => onConfirm || onOpenChange}>
                    Xác nhận
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalConfirm