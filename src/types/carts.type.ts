export interface ICart {
  id: string;
  quantity: number;
}

export interface IQuantities {
  [key: string]: number;
}

export interface ICartEmptyProps {
  cartSidebarRef: React.RefObject<HTMLDivElement>;
}

export interface ILoadmoreProps {
  content: string;
  clickEvent: React.MouseEventHandler<HTMLButtonElement>;
}

export interface INavProps {
  isCheckoutPage: boolean;
}
