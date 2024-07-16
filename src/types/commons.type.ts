import { TooltipPlacement } from "@nextui-org/react";

export interface ITooltipProps {
    content: React.ReactNode,
    children: React.ReactNode,
    placement: TooltipPlacement
}