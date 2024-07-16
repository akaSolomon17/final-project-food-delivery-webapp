import { Food } from "./foods.type";

export interface IModalAddProps {
    isOpen: boolean,
    onOpenChange: () => void,
    isEdit: boolean,
    currentFood: Food
}

export interface IModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    children: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
}
