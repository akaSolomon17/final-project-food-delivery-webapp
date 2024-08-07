import { Food } from "./foods.type";
import { IHistoryOrders } from "./historyOrders.type";

export interface IModalAddProps {
  isOpen: boolean;
  onOpenChange: () => void;
  currentFood: Food | null;
}

export interface IModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface IImagePreviewProps {
  width: number;
  imagePreview: string;
}

export interface IModalOrderDetailsProps {
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
  orderDetail: IHistoryOrders;
}
