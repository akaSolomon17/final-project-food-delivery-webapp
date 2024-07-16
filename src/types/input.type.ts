import { InputProps } from "@nextui-org/react";

export interface IInputFileValidationProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IInputValidationProps extends InputProps {
    name: string,
    clearOnFocus?: boolean
}

export interface ISelectValidationProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label?: string;
    children: React.ReactNode | React.ReactNode[];
}

