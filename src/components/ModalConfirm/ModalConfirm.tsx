import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';

interface IModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    children: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
}

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