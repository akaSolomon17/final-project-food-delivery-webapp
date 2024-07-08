import { Tooltip, TooltipPlacement } from "@nextui-org/react";
import { FC } from "react";

interface ITooltipProps {
    content: React.ReactNode,
    children: React.ReactNode,
    placement: TooltipPlacement
}

export const CTooltip: FC<ITooltipProps> = ({ content, children, placement }) => {
    return (
        <Tooltip radius="none" showArrow={true} content={content} placement={placement}>
            {children}
        </Tooltip>
    );
}
