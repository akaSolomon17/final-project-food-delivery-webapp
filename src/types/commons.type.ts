import { TooltipProps } from "@nextui-org/react";
import { Feedback } from "./feedbacks.type";

export interface ITooltipProps extends TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export interface IProductTagProps {
  label: string;
}

export interface INavigateSwiperProps {
  headerContent?: string;
}

export interface ITestimonialsCardsProps {
  feedbacks: Feedback;
}
