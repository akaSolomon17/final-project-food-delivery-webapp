import { UseFormSetValue } from "react-hook-form";

export interface CCheckoutLayoutProps {
    children: React.ReactNode,
    header: React.ReactNode,
    footer?: React.ReactNode
}

export interface ICheckoutProps {
    address: string,
    note: string,
    payment: string,
    profile: string,
}

export interface IDeliveryInfoProps {
    setValue: UseFormSetValue<ICheckoutProps>;
    address: string;
    note: string;
}

export interface IDetailsPaymentProps {
    payments: string[];
    profiles: string[];
}