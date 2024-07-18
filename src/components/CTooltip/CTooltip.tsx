import { Tooltip } from "@nextui-org/react";
import { FC } from "react";
import { ITooltipProps } from "../../types/commons.type";

export const CTooltip: FC<ITooltipProps> = ({
  content,
  children,
  ...props
}) => {
  return (
    <Tooltip radius="none" showArrow={true} content={content} {...props}>
      {children}
    </Tooltip>
  );
};

CTooltip.displayName = "CTooltip";
